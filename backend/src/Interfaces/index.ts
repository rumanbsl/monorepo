import { Request, Response } from "express";
import { Imodels } from "@/models";
/* eslint-disable import/no-extraneous-dependencies */
import { ObjectID as bsonID } from "bson";

export type Context = Imodels & { req: Request};
export type tryCatchWrapper = (fn: ResolverFn) => ResolverFn
export type ResolverFn = (rootValue: any, args: any, context: Context, info?: any) => Promise<any> | any;

export type Iqueries = {
  [key: string]: ResolverFn | tryCatchWrapper;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RequestProps {
  /*
    props are seperate as it is imported express type declaration file
    to avoid circular depency
    to have single source of additional props in Request
  */
}

export interface ObjectID extends bsonID {
  toString: () => string;
}
export type Irequest = Request & RequestProps;
export type Iresponse = Response;

export interface IanyObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type LooseObject<Contract> = {[key in keyof Contract]?: Contract[key]};
