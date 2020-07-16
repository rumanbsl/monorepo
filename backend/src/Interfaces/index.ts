/* eslint-disable import/no-extraneous-dependencies */
import { ObjectID as bsonID } from "bson";
import { Mutation, Query, Subscription } from "common/Interfaces/gql-definitions";
import { context } from "@/app";
import { Request } from "express";
import { UserSchemaWithMethods } from "@/models/User/methods";
import { FilterFn } from "apollo-server-express";
// type UnPromisify<T> = T extends Promise<infer U> ? U : T;
export type Context = ReturnType<typeof context>
export interface ObjectID extends bsonID {
  toString: () => string;
}
type Connection = NonNullable<Context["connection"]>;
type ConnectionContext = Connection["context"];
interface RequestWithUser extends Request { user: UserSchemaWithMethods; }
interface ExtendedConnectionContext extends ConnectionContext { user?: UserSchemaWithMethods; }
interface ExtendedConnection extends Connection {context: ExtendedConnectionContext}
export interface ContextWithSubscribedUser extends Context {
  connection: ExtendedConnection
}

export interface ContextWithReqUser extends Context {
  req: RequestWithUser;
}
export type ResolverFn<T> = (rootValue: any, args: any, context: ContextWithReqUser, info?: any) => Promise<T> | T;
export interface IanyObject {
  [key: string]: unknown;
}

export type RootMutation = Required<{ [key in keyof Mutation]: ResolverFn<Mutation[key]> }>
export type RootQuery = Required<{ [key in keyof Query]: ResolverFn<Query[key]> }>
export type RootSubscription = Required<{
  [key in keyof Subscription]: {
    subscribe: ResolverFn<AsyncIterator<key>>
    | (
        (asyncIteratorFn: ResolverFn<AsyncIterator<key>>, filterFn: FilterFn) => ResolverFn<AsyncIterator<key>>
      )
  }
}>

export type ObjectToString<T extends Record<string, unknown>> = {
  [key in keyof T]: T[key] extends ObjectID ? string :
  T[key] extends Record<string, unknown> ? ObjectToString<T[key]> : T[key]
}

export type AuthCookiesResponse = {["access-token"]?: string; ["refresh-token"]?: string};
