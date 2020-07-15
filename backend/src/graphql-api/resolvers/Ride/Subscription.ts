import { RootSubscription, Context, ContextWithSubscribedUser } from "@/Interfaces";
import { withFilter } from "apollo-server-express";
import { Ride } from "common/Interfaces/gql-definitions";

type Subscriptions = Pick<RootSubscription, "RIDE_PASSENGER_BROADCAST"|"RIDE_STATUS_UPDATE_BY_DRIVER">

const Subscription: Subscriptions = {
  RIDE_PASSENGER_BROADCAST: {
    subscribe: withFilter(
      (_, __, ctx: Context) => ctx.pubSub.asyncIterator("rideRequest"),
      ({ RIDE_PASSENGER_BROADCAST }: { RIDE_PASSENGER_BROADCAST: Ride }, __, ctx: ContextWithSubscribedUser) => {
        const passengerPos = RIDE_PASSENGER_BROADCAST.pickupInfo;
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
  RIDE_STATUS_UPDATE_BY_DRIVER: {
    subscribe: withFilter(
      (_, __, ctx: Context) => ctx.pubSub.asyncIterator("rideUpdate"),
      ({ RIDE_STATUS_UPDATE_BY_DRIVER }: {RIDE_STATUS_UPDATE_BY_DRIVER: Ride}, __, ctx: ContextWithSubscribedUser) => {
        const { user } = ctx.connection.context;
        const { passenger, driver } = RIDE_STATUS_UPDATE_BY_DRIVER;
        return user?._id.toString() === driver?._id.toString() || user?._id.toString() === passenger._id.toString();
      },
    ),
  },
};

export default Subscription;
