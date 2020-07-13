import { RootSubscription } from "@/Interfaces";
import { isAuthenticatedResolver } from "../Base";

const { createResolver: isAuthenticatedCreateResolver } = isAuthenticatedResolver;
type Subscriptions = Pick<RootSubscription, "USER_DRIVERS_GET">

const Subscription: Subscriptions = {
  USER_DRIVERS_GET: {
    // break
    subscribe: isAuthenticatedCreateResolver((_, __, ctx) => ctx.pubSub.asyncIterator("driversUpdate")),
  },
};

export default Subscription;
