import { IsDefined, IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { ModelObject } from "objection";
import { UserModel } from "../models-objection";

export type UserDas = ModelObject<UserModel>;

export type CreateUserDas = Omit<UserDas, "id">;

export class CreateUserDto {
  @IsDefined()
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  public name?: string;

  @IsDefined()
  @MinLength(1)
  @MaxLength(255)
  @IsEmail()
  @IsString()
  public email?: string;

  @IsDefined()
  @MinLength(6)
  @MaxLength(255)
  @IsString()
  public password?: string;
}

export class LoginUserDto {
  @IsDefined()
  @MinLength(1)
  @MaxLength(255)
  @IsEmail()
  @IsString()
  public email?: string;

  @IsDefined()
  @MinLength(6)
  @MaxLength(255)
  @IsString()
  public password?: string;
}

export class ConfirmRecoverPassDto {
  @IsDefined()
  @MinLength(1)
  @MaxLength(255)
  @IsEmail()
  @IsString()
  public email?: string;

  @IsDefined()
  @MinLength(6)
  @MaxLength(255)
  @IsString()
  public password?: string;

  @IsDefined()
  @MinLength(6)
  @MaxLength(6)
  @IsString()
  public code?: string;
}

export class ChangePasswordDto {
  @IsDefined()
  @MinLength(6)
  @MaxLength(255)
  @IsString()
  public oldPassword: string;

  @IsDefined()
  @MinLength(6)
  @MaxLength(255)
  @IsString()
  public newPassword: string;
}

export class ConfirmEmailDto {
  @IsDefined()
  @MinLength(1)
  @MaxLength(255)
  @IsEmail()
  @IsString()
  public email: string;

  @IsDefined()
  @MinLength(6)
  @MaxLength(6)
  @IsString()
  public code: string;
}

export interface UserInfo {
  name: string;
  email: string;
}

export interface UserTokens {
  access_token: string;
  id_token: string;
  refresh_token: string;
}
