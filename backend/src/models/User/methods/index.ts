import crypto from "crypto";
import { IuserSchema } from "..";

const methods = {
  encryptPassword(this: IuserSchema, password: string) {
    if (!password) return "";
    const hashed = crypto
      .createHmac("sha1", this._salt)
      .update(password)
      .digest("hex");
    return hashed;
  },
};

export type UserSchemaWithMethods = IuserSchema & typeof methods;
export default methods as UserSchemaWithMethods;
