import { ResolverFn, Context } from "@/Interfaces";
import MONGO_ERR from "@/models/MONGO_ERR";

type IError = Error & {
  code?: number;
  statusCode?: number;
  errmsg?: string;
  details?: {
    type?: string;
    message?: string;
  }[];
}

/**
 * @description
 * @param {IError} err
 */
function formatError(err: IError) {
  let errObj: {code?: number; message?: string} = {};
  if (Array.isArray(err.details)) {
    if (err.details[0]?.type === "string.pattern.base") {
      errObj.message = "Not valid input";
      errObj.code = 401;
    }
  } else if (err.name === "MongoError" && typeof err.code === "number") {
    errObj = {
      code    : err.code,
      // @ts-ignore
      message : MONGO_ERR[err.code] ? `DB_ERR_${MONGO_ERR[err.code]}` : "Something went wrong",
    };
  } else {
    errObj = { code: err.code || err.statusCode || 502, message: err.message || "Something went wrong" };
  }
  console.log(JSON.stringify({ err }, null, 2));
  throw new Error(`{ code: ${errObj.code}, details: ${errObj.message} }`);
}

/**
 * @description
 * @export
 * @param {(...arg: unknown[]) =>unknown} fn
 */
export default function tryCatchWrapper(fn: ResolverFn): ResolverFn {
  return function actualResolver(rootValue: unknown, args: unknown, context: Context, info?: unknown) {
    return fn(rootValue, args, context, info).catch((err: IError) => {
      formatError(err);
    });
  };
}
