import mongoose from "mongoose";
import { UserDbObject } from "@/Interfaces/gql-definitions";
import { v4 as uuid } from "uuid";
import methods, { UserSchemaWithMethods } from "./methods";

export type IuserSchema = UserDbObject & mongoose.Document & {
  _password: string;
  _salt: string;
};

const schema = new mongoose.Schema({
  name: {
    type     : String,
    required : true,
  },
  email: {
    type     : String,
    required : true,
    unique   : true,
  },
  sex: {
    type : String,
    enum : ["Male", "Female"],
  },
  // RWX:0; RW: 1; R:2
  role: {
    type    : Number,
    default : 1,
  },
  _password: {
    type     : String,
    required : true,
  },
  _salt: {
    type     : String,
    required : true,
  },
}, { timestamps: true });

schema
  .virtual("password")
  .set(function (this: UserSchemaWithMethods, password: string) {
    this._salt = uuid();
    this._password = this.encryptPassword(password);
  })
  .get(function (this: IuserSchema) {
    return this._password;
  });
schema.methods = methods;
export default mongoose.model<UserSchemaWithMethods>("User", schema, "users");
