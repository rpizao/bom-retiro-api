import { IAuthUser } from "../models/auth-user";
import { CollectionSchema } from "./ischema";

export class AuthUserSchema extends CollectionSchema<IAuthUser> {
  
  constructor(){
    super({
      name: String,
      email: String,
      passw: String,
      salt: String,
      clubIdentifier: String
    });
  }

  collectionName(): string {
    return "auth-users";
  }

  modelName(): string {
    return "AuthUserModel";
  }
}