import { ResolverFn, Context } from "@/Interfaces";

type IError = Error & {
  code?: number;
  statusCode?: number;
}

/**
 * @description
 * @export
 * @param {(...arg: unknown[]) =>unknown} fn
 */
export default function tryCatchWrapper(fn: ResolverFn): ResolverFn {
  return function actualResolver(rootValue: unknown, args: unknown, context: Context, info?: unknown) {
    return fn(rootValue, args, context, info).catch((err: IError) => {
      // eslint-disable-next-line no-console
      console.log(err);
      throw new Error(JSON.stringify({ code: err.code || err.statusCode || 502 }));
    });
  };
}
