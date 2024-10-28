import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { ChangePasswordDto, ConfirmEmailDto, ConfirmRecoverPassDto, CreateUserDto, LoginUserDto } from "../dto/user.dto";
import { CookiesHelper } from "../helpers/cookies.helper";
import { UserService } from "../services/user.service";
import { bindClassMethods } from "../util/bindeo-de-clases";

export class UserController {
  constructor(private readonly userService: UserService) {
    bindClassMethods(this);
  }

  public async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userData = plainToInstance(CreateUserDto, req.body);
      validate(userData)
        .then(errors => {
          if (errors.length) {
            const errorMsg = errors.map(err => Object.values(err.constraints!)).join(' - ');
            res.status(400).json(errorMsg);
          } else {
            this.userService.createUser(userData)
              .then(userName => res.status(201).send(JSON.stringify(userName)))
              .catch(err => {
                res.status(400).send(err.message);
                next(err);
              });
          }
        });
    } catch (err: any) {
      res.status(400).send(err.message);
      next(err);
    }
  }

  public async confirmEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const confirmEmailData = plainToInstance(ConfirmEmailDto, req.body);
      validate(confirmEmailData)
        .then(errors => {
          if (errors.length) {
            const errorMsg = errors.map(err => Object.values(err.constraints!)).join(' - ');
            res.status(400).json(errorMsg);
          } else {
            this.userService.confirmEmail(confirmEmailData)
              .then(() => res.status(201).send())
              .catch(err => {
                res.status(400).send(err.message);
                next(err);
              });
          }
        });
    } catch (err: any) {
      res.status(400).send(err.message);
      next(err);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
      const loginUser = plainToInstance(LoginUserDto, req.body);
      validate(loginUser)
        .then(errors => {
          if (errors.length) {
            const errorMsg = errors.map(err => Object.values(err.constraints!)).join(' - ');
            res.status(400).json(errorMsg);
          } else {
            this.userService.login(loginUser)
              .then(([userInfo, userTokens]) => {
                CookiesHelper.UpdateCognitoCookies(res, userTokens);
                res.status(201).send(userInfo);
              })
              .catch(err => {
                if (err.code === 'UserNotConfirmedException') {
                  res.status(401).send('user_not_confirmed');
                } else {
                  res.status(400).send(err.message);
                }
                next(err);
              });
          }
        });

    } catch (err: any) {
      res.status(400).send(err.message);
      next(err);
    }
  }

  public async logout(
    req: Request,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
      const id_token = req.cookies.id_token;
      this.userService.logout(id_token)
        .then(() => {
          CookiesHelper.ClearCookies(res);
          res.status(200).send();
        })
        .catch(err => {
          res.status(400).send(err.message);
          next(err);
        });
    } catch (err: any) {
      res.status(400).send(err.message);
      next(err);
    }
  }

  public async isUserLoggedIn(
    req: Request,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
      const id_token = req.cookies.id_token;
      const refresh_token = req.cookies.refresh_token;
      if (!id_token || !refresh_token) {
        res.status(200).send(false);
      } else {
        this.userService.isUserLoggedIn(id_token, refresh_token)
          .then(userTokens => {
            if (!userTokens) {
              res.status(200).send(true);
            } else {
              CookiesHelper.UpdateCognitoCookies(res, userTokens);
              res.status(200).send(true);
            }
          })
          .catch(() => {
            CookiesHelper.ClearCookies(res);
            res.status(200).send(false);
          });
      }
    } catch (err: any) {
      res.status(400).send(err.message);
      next(err);
    }
  }

  public async changePassword(
    req: Request,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
      const changePasswordDto = plainToInstance(ChangePasswordDto, req.body);
      validate(changePasswordDto)
        .then(errors => {
          if (errors.length) {
            const errorMsg = errors.map(err => Object.values(err.constraints!)).join(' - ');
            res.status(400).json(errorMsg);
          } else {
            const id_token = req.cookies.id_token;
            const refresh_token = req.cookies.refresh_token;
            if (!id_token || !refresh_token) {
              res.status(401).send("user_not_authenticated");
            } else {
              this.userService.changePassword(id_token, refresh_token, changePasswordDto)
                .then(([userTokens, success]) => {
                  if (userTokens) {
                    CookiesHelper.UpdateCognitoCookies(res, userTokens);
                  }
                  if (!success) {
                    res.status(400).send("Error al cambiar la contraseña");
                  } else {
                    res.status(200).send();
                  }
                })
                .catch(([userTokens, err]) => {
                  if (userTokens) {
                    CookiesHelper.UpdateCognitoCookies(res, userTokens);
                  }
                  res.status(400).send(err.message);
                });
            }
          }
        });
    } catch (err: any) {
      res.status(400).send(err.message);
      next(err);
    }
  }

  public async recoverPassword(
    req: Request,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
      const email: string = req.query['email'] as string;
      console.log(email)
      this.userService.recoverPassword(email)
        .then(() => res.status(201).send())
        .catch(err => {
          res.status(400).send(err.message);
          next(err);
        });
    } catch (err: any) {
      res.status(400).send(err.message);
      next(err);
    }
  }

  public async confirmRecoverPassword(
    req: Request,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
      const confirmRecoverPassDto = plainToInstance(ConfirmRecoverPassDto, req.body);
      validate(confirmRecoverPassDto)
        .then(errors => {
          if (errors.length) {
            const errorMsg = errors.map(err => Object.values(err.constraints!)).join(' - ');
            res.status(400).json(errorMsg);
          } else {
            this.userService.confirmRecoverPassword(confirmRecoverPassDto)
              .then(() => res.status(201).send())
              .catch(err => {
                res.status(400).send(err.message);
                next(err);
              });
          }
        });

    } catch (err: any) {
      res.status(400).send(err.message);
      next(err);
    }
  }
}
