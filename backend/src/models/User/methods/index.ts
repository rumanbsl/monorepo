import bcrypt from "bcrypt";
import apolloError from "@/utils/apolloError";
import uniqueArray from "@/utils/uniqueArray";
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
  async getGraph(this: IuserSchema, ...fields: ("chats"|"messages"|"places"|"ridesAsPassenger"|"ridesAsDriver")[]) {
    const models = fields.length ? uniqueArray(fields).join(" ") : ["chats", "messages", "places", "ridesAsPassenger", "ridesAsDriver"].join(" ");
    return this.populate(models).execPopulate();
  },
};

type Methods = typeof methods;
export interface UserSchemaWithMethods extends IuserSchema, Methods {}
export default methods as UserSchemaWithMethods;
