import { RootSubscription, Context, ContextWithSubscribedUser } from "@/Interfaces";
import { withFilter } from "apollo-server-express";
import { Message } from "common/Interfaces/gql-definitions";

type Subscriptions = Pick<RootSubscription, "ON_MESSAGE">

const Subscription: Subscriptions = {
  ON_MESSAGE: {
    subscribe: withFilter(
      (_, __, ctx: Context) => ctx.pubSub.asyncIterator("newChatMessage"),
      ({ ON_MESSAGE }: {ON_MESSAGE: Message}, __, ctx: ContextWithSubscribedUser) => {
        const { user } = ctx.connection.context;
        const { chat: { driver, passenger } } = ON_MESSAGE;
        return user?._id.toString() === driver?.toString() || user?._id.toString() === passenger?.toString();
      },
    ),
  },
};

export default Subscription;
