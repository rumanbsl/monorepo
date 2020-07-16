import { Chat } from "common/Interfaces/gql-definitions";
import uniqueArray from "@/utils/uniqueArray";
import { IChatSchema } from "..";

const methods = {
  async getGraph(this: IChatSchema, ...fields: ("messages"|"passenger"|"driver"| "ride")[]) {
    const models = fields.length ? uniqueArray(fields).join(" ") : ["messages", "passenger", "driver", "ride"].join(" ");
    return this.populate(models).execPopulate() as unknown as Chat;
  },
};

type Methods = typeof methods;
export interface ChatSchemaWithMethods extends IChatSchema, Methods {}
export default methods as ChatSchemaWithMethods;