import { RootQuery } from "@/Interfaces";
import { QueryChat_GetArgs } from "common/Interfaces/gql-definitions";
import OID from "@/utils/OID";
import apolloError from "@/utils/apolloError";
import { isAuthenticatedResolver } from "../Base";

const { createResolver: loggedIn } = isAuthenticatedResolver;
type Queries = Pick<RootQuery, "CHAT_GET">

const Query: Queries = {
  CHAT_GET: loggedIn(async (_, input: QueryChat_GetArgs, ctx) => {
    const { models: { Chat }, req: { user } } = ctx;
    const chat = await Chat.findOne({
      _id : OID(input.chatId),
      $or : [{ passenger: user._id }, { driver: user._id }],
    });
    if (!chat) throw apolloError({ type: "NotFoundInDBError" });
    return chat.toJSON();
  }),
};

export default Query;
