import { RootSubscription, Context, ContextWithSubscribedUser } from "@/Interfaces";
import { withFilter } from "apollo-server-express";
import { IRideSchema } from "@/models/Ride";

type Subscriptions = Pick<RootSubscription, "RIDE_DRIVER_CURRENT_LOCATION">

const Subscription: Subscriptions = {
  RIDE_DRIVER_CURRENT_LOCATION: {
    subscribe: withFilter(
      (_, __, ctx: Context) => ctx.pubSub.asyncIterator("rideRequest"),
      ({ RIDE_DRIVER_CURRENT_LOCATION }: { RIDE_DRIVER_CURRENT_LOCATION: IRideSchema }, __, ctx: ContextWithSubscribedUser) => {
        const passengerPos = RIDE_DRIVER_CURRENT_LOCATION.pickupInfo;
        const driverPos = ctx.connection.context.user?.lastPosition;
        if (
          typeof passengerPos?.lat !== "number"
          || typeof passengerPos?.lng !== "number"
          || typeof driverPos?.lat !== "number"
          || typeof driverPos?.lng !== "number"
        ) return false;

        return (
          passengerPos.lat >= driverPos.lat - 0.5
          && passengerPos.lat <= driverPos.lat + 0.5
          && passengerPos.lng >= driverPos.lng - 0.5
          && passengerPos.lng <= driverPos.lng + 0.5
        );
      },
    ),
  },
};

export default Subscription;
