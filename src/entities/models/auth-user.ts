import { Document } from "mongoose";

export interface IAuthUser extends Document {
  _id: string;
  name: string;
  email: string;
  passw: string;
  salt: string;
  department: string;
}

export interface AuthToken {
  user: {fullname: string, department: string};
  token: string;

}