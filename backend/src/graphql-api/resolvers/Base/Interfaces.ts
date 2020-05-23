import { ComposeResolversFunction } from "apollo-resolvers/dist/resolver";
import { Context } from "@/Interfaces";

export interface ResultFunction<ResulType> {
  (root: any, args: any, context: Context, info?: any): Promise<ResulType> | ResulType | void;
}
export interface ErrorFunction<ErrorType> {
  (root: any, args: any, context: Context, err: any): ErrorType | void;
}
export interface CreateResolverFunction {
  <R, E>(resFn: ResultFunction<R> | null, errFn?: ErrorFunction<E>): Resolver<R>;
}

export interface Resolver<ResulType> {
  (root: any, args: any, context: Context, info?: any): Promise<ResulType>;
  createResolver: CreateResolverFunction;
  compose: ComposeResolversFunction;
}
