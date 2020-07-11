import apolloError from "./apolloError";

/**
 * @description Check whether a string is valid ObjectId
 * @export
 * @param {string} str
 * @returns {boolean}
 */
export default function $validBson(str: any): boolean {
  if (typeof str !== "string") throw apolloError({ type: "InvalidInputError", message: "Not a valid object id" });
  const validBson = /^[a-fA-F0-9]{24}$/;
  return validBson.test(str);
}
