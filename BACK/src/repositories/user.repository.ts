import { ModelClass } from "objection";
import { CreateUserDas } from "../dto/user.dto";
import { UserModel } from "../models-objection";

export class UserRepository {
  constructor(private readonly userModel: ModelClass<UserModel>) { }

  public async createUser(userDto: CreateUserDas): Promise<void> {
    try {
      //await this.userModel.query().insert(userDto);
      console.log("User created");
    } catch (e: any) {
      if (e.code === "23505") {
        throw new Error("User already exists");
      }
      throw e;
    }
  }
}
