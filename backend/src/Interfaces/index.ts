import { Mutation, Query } from "@/Interfaces/gql-definitions";
import { Types } from "mongoose";
import { context } from "@/app";

// type UnPromisify<T> = T extends Promise<infer U> ? U : T;
export type Context = ReturnType<typeof context>
export type ResolverFn<T> = (rootValue: any, args: any, context: Context, info?: any) => Promise<T> | T;

export interface ObjectID extends Types.ObjectId {
  toString: () => string;
}

export interface IanyObject {
  [key: string]: unknown;
}

export type Mutations = Omit<Partial<{
  [key in keyof Mutation]: ResolverFn<Mutation[key]>;
}>, "__typename" | "_">
export type Queries = Omit<Partial<{
  [key in keyof Query]: ResolverFn<Query[key]>;
}>, "__typename" | "_">
