import { Request, Response } from "express";
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
type UserMutationKeys = Pick<Mutation, "createUserActivationEmail"|"loginUser">
export type IuserMutations = {
  [key in keyof UserMutationKeys]: ResolverFn<Promise<UserMutationKeys[key]>>;
}

export interface RequestProps {
  no: undefined;
}

export interface ObjectID extends Types.ObjectId {
  toString: () => string;
}
export type Irequest = Request & RequestProps;
export type Iresponse = Response;

export interface IanyObject {
  [key: string]: unknown;
}
