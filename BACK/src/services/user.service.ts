import { AuthenticationDetails, CognitoRefreshToken, CognitoUser, CognitoUserAttribute, CognitoUserPool, CognitoUserSession, ISignUpResult } from "amazon-cognito-identity-js";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { CognitoJwtPayload } from "aws-jwt-verify/jwt-model";
import jwt from 'jsonwebtoken';
import { ChangePasswordDto, ConfirmEmailDto, ConfirmRecoverPassDto, CreateUserDto, LoginUserDto, UserInfo, UserTokens } from "../dto/user.dto";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  readonly poolData = {
    UserPoolId: "us-east-2_rEDW3X3rf", // Your user pool id here    
    ClientId: "9jnktj2b4tao5q29hq9fp132g" // Your client id here
  };

  readonly userPool = new CognitoUserPool(this.poolData);


  constructor(private readonly userRepository: UserRepository) { }

  public async createUser(user: CreateUserDto): Promise<string> {
    return new Promise<string>((res, rej) => {
      var attributeList = [];
      attributeList.push(new CognitoUserAttribute({ Name: "email", Value: user.email! }));
      attributeList.push(new CognitoUserAttribute({ Name: "name", Value: user.name! }));

      this.userPool.signUp(user.email!, user.password!, attributeList, [], (err: Error | undefined, result: ISignUpResult | undefined) => {
        if (err) {
          rej(err);
        } else {
          const cognitoUser: CognitoUser = result!.user;
          res(cognitoUser.getUsername());
        }
      });
    });
  }

  public async confirmEmail(confirmEmailData: ConfirmEmailDto): Promise<void> {
    return new Promise<void>((res, rej) => {
      const userData = {
        Username: confirmEmailData.email,
        Pool: this.userPool,
      }
      const cognitoUser = new CognitoUser(userData);

      cognitoUser.confirmRegistration(confirmEmailData.code, false, err => err ? rej(err) : res());
    });
  }

  public async recoverPassword(email: string): Promise<void> {
    return new Promise<void>((res, rej) => {
      const userData = {
        Username: email,
        Pool: this.userPool,
      }
      const cognitoUser = new CognitoUser(userData);

      cognitoUser.forgotPassword({
        onSuccess: () => res(),
        onFailure: err => rej(err),
      });
    });
  }

  public async confirmRecoverPassword(confirmRecoverPassDto: ConfirmRecoverPassDto): Promise<void> {
    return new Promise<void>((res, rej) => {
      const userData = {
        Username: confirmRecoverPassDto.email!,
        Pool: this.userPool,
      }
      const cognitoUser = new CognitoUser(userData);

      cognitoUser.confirmPassword(confirmRecoverPassDto.code!, confirmRecoverPassDto.password!, {
        onSuccess: pan => {
          console.log(pan);
          res();
        },
        onFailure: err => rej(err),
      });
    });
  }

  public async login(user: LoginUserDto): Promise<[UserInfo, UserTokens]> {
    return new Promise<[UserInfo, UserTokens]>((res, rej) => {
      const authenticationDetails = new AuthenticationDetails({
        Username: user.email!,
        Password: user.password,
      });
      const userData = {
        Username: user.email!,
        Pool: this.userPool
      };
      const cognitoUser = new CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: result => {
          const userTokens: UserTokens = {
            access_token: result.getAccessToken().getJwtToken(),
            id_token: result.getIdToken().getJwtToken(),
            refresh_token: result.getRefreshToken().getToken(),
          }
          const idTokenPayload: any = jwt.decode(userTokens.id_token);
          const userInfo: UserInfo = {
            email: idTokenPayload.email as string,
            name: idTokenPayload.name as string,
          };
          res([userInfo, userTokens]);
        },
        onFailure: err => rej(err)
      });
    });
  }

  public async logout(id_token: string): Promise<void> {
    return new Promise<void>((res, rej) => {
      const payload: any = jwt.decode(id_token);
      const userData = {
        Username: payload.email as string,
        Pool: this.userPool,
      }
      const cognitoUser = new CognitoUser(userData);
      cognitoUser.signOut(() => res());
    });
  }

  public async isUserLoggedIn(id_token: string, refresh_token: string): Promise<UserTokens | void> {
    return new Promise<UserTokens | void>((res, rej) => {
      this.verifyToken(id_token, "id", {
        success: () => res(),
        failure: err => {
          if (err.message.includes("Token expired")) {
            this.tryRefreshToken(id_token, refresh_token, {
              success: userTokens => res(userTokens),
              failure: () => rej()
            })
          } else {
            rej(err);
          }
        }
      })
    });
  }

  public async changePassword(id_token: string, refresh_token: string, changePasswordDto: ChangePasswordDto): Promise<[UserTokens, "SUCCESS" | undefined | Error]> {
    return new Promise<[UserTokens, "SUCCESS" | undefined | Error]>((res, rej) => {
      this.tryRefreshToken(id_token, refresh_token, {
        success: (userTokens, user) => {
          user.changePassword(changePasswordDto.oldPassword, changePasswordDto.newPassword, (err, success) =>
            err ? rej([userTokens, err]) : res([userTokens, success])
          );
        },
        failure: err => rej([undefined, err])
      });
    })
  }

  private tryRefreshToken(id_token: string, refresh_token: string,
    callbacks: { success?: (userTokens: UserTokens, user: CognitoUser) => void, failure?: (err: any) => void }
  ) {
    const idToken: any = jwt.decode(id_token);
    const refreshToken = new CognitoRefreshToken({ RefreshToken: refresh_token });
    const userData = {
      Username: idToken.email,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.refreshSession(refreshToken, (err: any, result: CognitoUserSession) => {
      if (err) {
        callbacks.failure ? callbacks.failure(err) : null;
      } else {
        const userTokens: UserTokens = {
          access_token: result.getAccessToken().getJwtToken(),
          id_token: result.getIdToken().getJwtToken(),
          refresh_token: result.getRefreshToken().getToken(),
        }
        callbacks.success ? callbacks.success(userTokens, cognitoUser) : null;
      }
    });
  }

  public verifyToken(token: string, tokenUse: "id" | "access",
    callbacks: { success?: (payload: CognitoJwtPayload) => void, failure?: (err: any) => void }) {
    const verifier = CognitoJwtVerifier.create({
      userPoolId: this.poolData.UserPoolId,
      tokenUse: tokenUse,
      clientId: this.poolData.ClientId,
    });
    verifier.verify(token)
      .then(payload => callbacks.success ? callbacks.success(payload) : null)
      .catch(err => callbacks.failure ? callbacks.failure(err) : null);
  }
}
