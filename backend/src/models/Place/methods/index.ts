import { Place } from "@/Interfaces/gql-definitions";
import { IPlaceSchema } from "..";

const methods = {
  async getGraph(this: IPlaceSchema) {
    return this.populate("user").toJSON() as unknown as Place;
  },
};

type Methods = typeof methods;
export interface PlaceSchemaWithMethods extends IPlaceSchema, Methods {}
export default methods as PlaceSchemaWithMethods;
