import { withFilter } from "apollo-server-express";
import { RootSubscription, Context, ContextWithSubscribedUser } from "@/Interfaces";
import { MessageOutput } from "@/Interfaces/gql-definitions";

type Subscriptions = Pick<RootSubscription, "ON_MESSAGE">

const Subscription: Subscriptions = {
  ON_MESSAGE: {
    subscribe: withFilter(
      (_, __, ctx: Context) => ctx.pubSub.asyncIterator("newChatMessage"),
      async ({ ON_MESSAGE }: {ON_MESSAGE: MessageOutput}, __, ctx: ContextWithSubscribedUser) => {
        const { user } = ctx.connection.context;
        const { Chat } = ctx.models;
        const { chat: ChatId } = ON_MESSAGE;
        const chat = await Chat.findById(ChatId);
        return user?._id.toString() === chat?.driver?.toString() || user?._id.toString() === chat?.passenger?.toString();
      },
    ),
  },
};

export default Subscription;
