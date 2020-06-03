import crypto from "crypto";
import { IuserSchema } from "..";

const methods = {
  authenticate(this: IuserSchema, passwordPlain: string) {
    return (this as any).encryptPassword(passwordPlain) === this.password;
  },
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
