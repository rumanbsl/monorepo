import bcrypt from "bcrypt";
import { IuserSchema } from "..";

const methods = {
  authenticate(this: IuserSchema, password: string) {
    if (!this._password) return false;
    return bcrypt.compareSync(password, this._password);
  },
  encryptPassword(this: IuserSchema, password: string) {
    if (!password) return "";
    const hashed = bcrypt.hashSync(password, process.env.BCRYPT_SAL_ROUNDS);
    return hashed;
  },
};

export type UserSchemaWithMethods = IuserSchema & typeof methods;
export default methods as UserSchemaWithMethods;
