import bcrypt from "bcrypt";
import { IuserSchema } from "..";

const methods = {
  authenticate(this: IuserSchema, password: string) {
    if (!this._password) return false;
    return bcrypt.compareSync(password, this._password);
  },
  encryptPassword(this: IuserSchema, password: string) {
    if (!password) return "";
    const hashed = bcrypt.hashSync(password, process.env.BCRYPT_SALT_ROUNDS);
    return hashed;
  },
};

type Methods = typeof methods;
export interface UserSchemaWithMethods extends IuserSchema, Methods {}
export default methods as UserSchemaWithMethods;
