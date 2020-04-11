import { ResolverFn, Context } from "@/Interfaces";
import MONGO_ERR from "@/models/MONGO_ERR";

type IError = Error & {
  code?: number;
  statusCode?: number;
  errmsg?: string;
  details?: {
    type?: string;
    message?: string;
    context: { value: unknown; key: string };
  }[];
  keyValue?: {[key: string]: any};
}

/**
 * @description
 * @param {IError} err
 */
function formatError(err: IError) {
  let errObj: {code?: number; message?: string} = {};
  if (Array.isArray(err.details) && err.details?.length > 0) {
    const [{ type, context }] = err.details;
    if (type === "string.pattern.base") {
      errObj.message = `Not valid input for '${context.key}', given: '${context.value}'`;
      errObj.code = 401;
    }
  } else if (err.name === "MongoError" && typeof err.code === "number") {
    const readableErr = (() => {
      if (err.keyValue) {
        return Object.keys(err.keyValue).reduce((acc, key) => acc.concat(`{ ${key}: ${(err.keyValue as any)[key]} }.`), "");
      }
      return "";
    })();
    errObj = {
      code    : err.code,
      // @ts-ignore
      message : MONGO_ERR[err.code] ? `DB_ERR_${MONGO_ERR[err.code]}. ${readableErr}` : "Something went wrong",
    };
  } else {
    errObj = { code: err.code || err.statusCode || 502, message: err.message || "Something went wrong" };
  }
  // eslint-disable-next-line global-require
  console.log(require("util").inspect(err, { colors: true, depth: null }));
  throw new Error(`{ code: ${errObj.code}, details: ${errObj.message} }`);
}

/**
 * @description
 * @export
 * @param {(...arg: unknown[]) =>unknown} fn
 */
export default function tryCatchWrapper<T>(fn: ResolverFn<T>): ResolverFn<T> {
  return function actualResolver(rootValue: unknown, args: unknown, context: Context, info?: unknown) {
    return (fn(rootValue, args, context, info) as any).catch((err: IError) => {
      formatError(err);
    });
  };
}
