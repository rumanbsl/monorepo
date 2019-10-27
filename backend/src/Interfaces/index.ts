import { Request } from "express";
import tryCatchWrapper from "@/utils/tryCatchWrapper";

import { Imodels } from "@/models";

export type Context = Imodels & { req: Request};

export type shapeTryCatch = typeof tryCatchWrapper;
export type ResolverFn = (rootValue: unknown, args: unknown, context: Context, info?: unknown) => Promise<any> | any;

export type Iqueries = {
  [key: string]: ResolverFn | shapeTryCatch;
}
