import { createResolver } from "apollo-resolvers";
import { isInstance } from "apollo-errors";
import { Context, ContextWithReqUser } from "@/Interfaces";
import ApolloError from "@/utils/apolloError";
import { decodeJWTAndGetUser, extractAuthCookies } from "@/utils/authorization";
import { Resolver } from "./Interfaces";

interface ContextWithUser extends Omit<ContextWithReqUser, "req"> {
  req: ContextWithReqUser["req"]
}

export const baseResolver = createResolver(
  null,
  (_, __, ___, error) => {
    if (isInstance(error)) return error;
    if (error.name === "TokenExpiredError") {
      return ApolloError({ internalData: error, type: "UnknownError", message: "Token Expired!" });
    }
    return ApolloError({ internalData: error, type: "UnknownError" });
  },
) as Resolver<any>;

export const isAuthenticatedResolver = baseResolver.createResolver(
  async (_, __, ctx) => {
    const { req } = ctx as ContextWithUser;
    const cookies = extractAuthCookies(req.cookies);
    req.user = await decodeJWTAndGetUser(cookies);
  },
) as Resolver<any, ContextWithReqUser>;

export const isAdminResolver = isAuthenticatedResolver.createResolver(
  // Extract the user and make sure they are an admin
  (_, __, ctx: Context) => {
    const condition = true;
    console.log(Object.keys(ctx));
    if (!condition) throw ApolloError({ type: "ForbiddenError" });
  },
);
