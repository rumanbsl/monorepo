import bcrypt from "bcrypt";
import apolloError from "@/utils/apolloError";
import { IuserSchema } from "..";

const methods = {
  authenticate(this: IuserSchema, password: string) {
    if (!this._password) return false;
    return bcrypt.compareSync(password, this._password);
  },
  encryptPassword(this: IuserSchema, password: string) {
    if (!password) throw apolloError({ type: "InvalidInputError", data: { password } });
    const hashed = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT_ROUNDS, 10));
    return hashed;
  },
};

type Methods = typeof methods;
export interface UserSchemaWithMethods extends IuserSchema, Methods {}
export default methods as UserSchemaWithMethods;
