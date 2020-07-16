import { Ride } from "common/Interfaces/gql-definitions";
import uniqueArray from "@/utils/uniqueArray";
import { IRideSchema } from "..";

const methods = {
  async getGraph(this: IRideSchema, ...fields: ("passenger"| "driver"| "chat")[]) {
    const models = fields.length ? uniqueArray(fields).join(" ") : ["passenger", "driver", "chat"].join(" ");
    return this.populate(models).execPopulate() as unknown as Ride;
  },
};

type Methods = typeof methods;
export interface RideSchemaWithMethods extends IRideSchema, Methods {}
export default methods as RideSchemaWithMethods;
