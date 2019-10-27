/**
 * @description Check whether a string is valid ObjectId
 * @export
 * @param {string} str
 * @returns {boolean}
 */
export default function $validBson(str: string): boolean {
  const validBson = /^[a-fA-F0-9]{24}$/;
  return validBson.test(str);
}
