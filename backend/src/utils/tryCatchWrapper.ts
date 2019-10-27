import { ResolverFn } from "@/Interfaces";
import { Imodels } from "@/models";

/**
 * @description
 * @export
 * @param {(...arg: any[]) =>any} fn
 */
export default function tryCatchWrapper(fn: ((rootValue: any, args: any, context: Imodels, info?: any) => Promise<any>)): ResolverFn {
  return function actualResolver(rootValue = undefined, args = undefined, context: Imodels, info = undefined) {
    return fn(rootValue, args, context, info).catch((err) => { throw err; });
  };
}
