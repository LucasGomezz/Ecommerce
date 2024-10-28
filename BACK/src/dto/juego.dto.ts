import { IsDefined, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { ModelObject } from "objection";
import { JuegoModel } from "../models-objection";

export type JuegoDas = ModelObject<JuegoModel>;

export type CreateJuegoDas = Omit<JuegoDas, "id">;

export class CreateJuegoDto {
  @IsDefined()
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  public nombre: string;

  @IsDefined()
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  public descripcion: string;

  @IsDefined()
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  public genero: string;

  @IsDefined()
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  public imagen: string;

  @IsDefined()
  @Min(1)
  @Max(255)
  @IsNumber()
  public clasificacion: number;

  @IsDefined()
  @Min(1)
  @Max(255)
  @IsNumber()
  public precio: number;

  @IsDefined()
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  public imagenHorizontal: string;
}
