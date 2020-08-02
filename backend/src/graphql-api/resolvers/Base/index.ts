import { isInstance } from "apollo-errors";
import { createResolver } from "apollo-resolvers";
import { Context, ContextWithReqUser } from "@/Interfaces";
import ApolloError from "@/utils/apolloError";
import { decodeJWTAndGetUser, extractAuthHeader } from "@/utils/authorization";
import { Resolver } from "./Interfaces";

interface ContextWithUser extends Omit<ContextWithReqUser, "req"> {
  req: ContextWithReqUser["req"]
}

export const baseResolver = createResolver(
  null,
  (_, __, ___, error) => {
    if (error.name === "TokenExpiredError") {
      return ApolloError({ internalData: error, type: "UnknownError", message: "Token Expired!" });
    }
    if (isInstance(error)) return error;
    return ApolloError({ internalData: error, type: "UnknownError" });
  },
) as Resolver<any>;

export const isAuthenticatedResolver = baseResolver.createResolver(
  async (_, __, ctx) => {
    const { req } = ctx as ContextWithUser;
    const token = extractAuthHeader(req.headers["x-auth"]);
    if (!token) throw ApolloError({ type: "ForbiddenError" });
    const { user } = await decodeJWTAndGetUser({ "access-token": token });
    if (!user) throw ApolloError({ type: "ForbiddenError" });
    req.user = user;
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
