import { ComposeResolversFunction } from "apollo-resolvers/dist/resolver";
import { Context, ContextWithReqUser } from "@/Interfaces";

export interface ResultFunction<ResulType, CTX> {
  (root: any, args: any, context: CTX, info?: any): Promise<ResulType> | ResulType | void;
}
export interface ErrorFunction<ErrorType> {
  (root: any, args: any, context: Context, err: any): ErrorType | void;
}
export interface CreateResolverFunction<CTX> {
  <R, E>(resFn: ResultFunction<R, CTX> | null, errFn?: ErrorFunction<E>): Resolver<R>;
}

export interface Resolver<ResulType, CTX extends Context = Context> {
  (root: any, args: any, context: CTX extends ContextWithReqUser ? ContextWithReqUser : Context, info?: any): Promise<ResulType>;
  createResolver: CreateResolverFunction<CTX extends ContextWithReqUser ? ContextWithReqUser : Context>;
  compose: ComposeResolversFunction;
}
