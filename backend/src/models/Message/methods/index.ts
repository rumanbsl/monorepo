import { Message } from "common/Interfaces/gql-definitions";
import uniqueArray from "@/utils/uniqueArray";
import { IMessageSchema } from "..";

const methods = {
  async getGraph(this: IMessageSchema, ...fields: ("chat"|"user")[]) {
    const models = fields.length ? uniqueArray(fields).join(" ") : ["chat", "user"].join(" ");
    return this.populate(models).execPopulate() as unknown as Message;
  },
};

type Methods = typeof methods;
export interface MessageSchemaWithMethods extends IMessageSchema, Methods {}
export default methods as MessageSchemaWithMethods;
