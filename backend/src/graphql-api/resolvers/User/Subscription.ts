import { RootSubscription, Context, ContextWithSubscribedUser } from "@/Interfaces";
import { withFilter } from "apollo-server-express";
import { UserSchemaWithMethods } from "@/models/User/methods";

type Subscriptions = Pick<RootSubscription, "USER_DRIVERS_GET">

const Subscription: Subscriptions = {
  USER_DRIVERS_GET: {
    subscribe: withFilter(
      (_, __, ctx: Context) => ctx.pubSub.asyncIterator("driversUpdate"),
      ({ USER_DRIVERS_GET }: { USER_DRIVERS_GET: UserSchemaWithMethods }, __, ctx: ContextWithSubscribedUser) => {
        const driverPos = USER_DRIVERS_GET.lastPosition;
        const userPos = ctx.connection.context.user?.lastPosition;
        if (
          typeof driverPos?.lat !== "number"
          || typeof driverPos?.lng !== "number"
          || typeof userPos?.lat !== "number"
          || typeof userPos?.lng !== "number"
        ) return false;

        return (
          driverPos.lat >= userPos.lat - 0.5
          && driverPos.lat <= userPos.lat + 0.5
          && driverPos.lng >= userPos.lng - 0.5
          && driverPos.lng <= userPos.lng + 0.5
        );
      },
    ),
  },
};

export default Subscription;
