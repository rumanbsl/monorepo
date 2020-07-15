import apolloError from "./apolloError";

/**
 * @description Check whether a string is valid ObjectId
 * @export
 * @param {string} str
 * @returns {boolean}
 */
export default function validBson(str: any): boolean {
  if (typeof str !== "string") throw apolloError({ type: "InvalidInputError", message: "Not a valid object id" });
  const bsonRegEx = /^[a-fA-F0-9]{24}$/;
  return bsonRegEx.test(str);
}
