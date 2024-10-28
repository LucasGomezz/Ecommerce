import { type QueryContext } from "objection";
import { BaseModel } from "./base.model";

export const juegoTableName = "juego";

export class JuegoModel extends BaseModel {
  public static tableName = juegoTableName;

  public async $beforeInsert(queryContext: QueryContext): Promise<any> {
    await super.$beforeInsert(queryContext);
  }

  public nombre: string;
  public descripcion: string;
  public genero: string;
  public imagen: string;
  public clasificacion: number;
  public precio: number;
  public imagenHorizontal: string;
}