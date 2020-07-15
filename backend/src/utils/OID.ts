import mongoose from "mongoose";

import validBson from "./validBson";
import apolloError from "./apolloError";

/**
 * @description transform string to mongoose Object ID
 * @export
 * @param {string} id
 * @returns {ObjectID}
 */
export default function OID(id: unknown): mongoose.Types.ObjectId {
  if (validBson(id) === false) throw apolloError({ type: "InvalidInputError", message: "Casting to Object Id failed, check input" });
  return mongoose.Types.ObjectId(id as string);
}
