import { Request } from "express";

import { Imodels } from "@/models";

export type Context = Imodels & { req: Request};

export type tryCatchWrapper = (fn: ResolverFn) => ResolverFn
export type ResolverFn = (rootValue: any, args: any, context: Context, info?: any) => Promise<any> | any;

export type Iqueries = {
  [key: string]: ResolverFn | tryCatchWrapper;
}
