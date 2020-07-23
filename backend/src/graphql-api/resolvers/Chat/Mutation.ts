import { RootMutation } from "@/Interfaces";
import { MutationChat_Send_MessageArgs } from "common/Interfaces/gql-definitions";
import OID from "@/utils/OID";
import apolloError from "@/utils/apolloError";
import { CreateMessageArg } from "common/Interfaces";
import { isAuthenticatedResolver } from "../Base";

const { createResolver: loggedIn } = isAuthenticatedResolver;
type Mutations = Pick<RootMutation, "CHAT_SEND_MESSAGE">

const Mutation: Mutations = {
  CHAT_SEND_MESSAGE: loggedIn(async (_, input: MutationChat_Send_MessageArgs, ctx) => {
    const { models: { Chat, Message }, req: { user }, pubSub } = ctx;
    const chat = await Chat.findOne({ _id: OID(input.chatId), $or: [{ passenger: user._id }, { driver: user._id }] });
    if (!chat) throw apolloError({ type: "NotFoundInDBError" });
    const message = await Message.create<CreateMessageArg>({ chat: chat._id, user: user._id, text: input.text });
    void pubSub.publish("newChatMessage", { ON_MESSAGE: message });

    return message.toJSON();
  }),
};

export default Mutation;
