import { Request } from "express";
import { Imodels } from "@/models";
import { Mutation, Query } from "@/Interfaces/gql-definitions";
import { Types } from "mongoose";

export type Context = Imodels & { req: Request};
export type tryCatchWrapper<T> = (fn: ResolverFn<T>) => ResolverFn<T>
export type ResolverFn<T> = (rootValue: any, args: any, context: Context, info?: any) => T;

type Iquery = Omit<Query, "__typename"|"_">
type Imutation = Omit<Mutation, "__typename"|"_">

export type Iqueries = {
  [key in keyof Iquery]: ResolverFn<Promise<Iquery[key]>>
}
export type Imutations = {
  [key in keyof Imutation]: ResolverFn<Promise<Imutation[key]>>
}
/* ------------ USER ----------- */
type UserMutationKeys = Pick<Mutation, "createUserActivationEmail"|"loginUser">
type UserQueryKeys = Pick<Query, "getUser" | "getUsers">
export type IuserMutations = {
  [key in keyof UserMutationKeys]: ResolverFn<Promise<UserMutationKeys[key]>>;
}
export type IuserQueries = {
  [key in keyof UserQueryKeys]: ResolverFn<Promise<UserQueryKeys[key]>>;
}

/* ------------ GENERAL ----------- */
type GeneralQueryKeys = Pick<Query, "api">;
export type IGeneralQueries = {
  [key in keyof GeneralQueryKeys]: ResolverFn<Promise<GeneralQueryKeys[key]>>;
}

export interface ObjectID extends Types.ObjectId {
  toString: () => string;
}

export interface IanyObject {
  [key: string]: unknown;
}
