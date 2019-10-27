import tryCatchWrapper from "@/utils/tryCatchWrapper";

import { Imodels } from "@/models";

export type shapeTryCatch = typeof tryCatchWrapper;
export type ResolverFn = (rootValue: any, args: any, context: Imodels, info?: any) => unknown;

export type Iqueries = {
  [key: string]: ResolverFn | shapeTryCatch;
}
