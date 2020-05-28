import { Queries, Mutations } from "@/Interfaces";
import { MutationUser_LoginArgs } from "@/Interfaces/gql-definitions";
import apolloError from "@/utils/apolloError";
import { isAdminResolver, baseResolver } from "../Base";

const Query: Queries = { USER_GET: isAdminResolver.createResolver(async (_, userId: string, ctx) => ctx.models.User.findById(userId)) };

const Mutation: Mutations = {
  USER_LOGIN: baseResolver.createResolver(async (_, { email, password }: MutationUser_LoginArgs, ctx) => {
    const { user } = await ctx.authenticate("graphql-local", { email, password });
    if (!user) throw apolloError({ type: "AuthenticationFailed" });
    await ctx.login(user);
    return user;
  }),
};

export default { Query, Mutation };
