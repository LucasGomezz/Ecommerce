import { type QueryContext } from "objection";
import { BaseModel } from "./base.model";

export const userTableName = "users";

export class UserModel extends BaseModel {
  public static tableName = userTableName;

  public async $beforeInsert(queryContext: QueryContext): Promise<any> {
    await super.$beforeInsert(queryContext);
  }

  public name: string;
  public email: string;
  public password: string;
}
