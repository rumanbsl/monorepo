import { Mutation, Query } from "common/Interfaces/gql-definitions";
import { Types } from "mongoose";
import { context } from "@/app";
import { Request } from "express";
import { UserSchemaWithMethods } from "@/models/User/methods";

// type UnPromisify<T> = T extends Promise<infer U> ? U : T;
export type Context = ReturnType<typeof context>
interface RequestWithUser extends Request {
  user: UserSchemaWithMethods;
}

export interface ContextWithReqUser extends Context {
  req: RequestWithUser;
}
export type ResolverFn<T> = (rootValue: any, args: any, context: Context, info?: any) => Required<Promise<T> | T>;

export interface ObjectID extends Types.ObjectId {
  toString: () => string;
}

export interface IanyObject {
  [key: string]: unknown;
}

export type RootMutation = Required<Omit<{ [key in keyof Mutation]: ResolverFn<Mutation[key]>}, "__typename" | "_">>
export type RootQuery = Required<Omit<{ [key in keyof Query]: ResolverFn<Query[key]>}, "__typename" | "_">>
