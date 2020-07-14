import { UserDbObject, VerificationDbObject, PlaceDbObject, RideDbObject } from "./Interfaces/gql-definitions";

export interface CreateUserArg extends Partial<UserDbObject> {
  name: UserDbObject["name"]
}
export interface CreateVerificationArg extends Partial<VerificationDbObject> {
  target: VerificationDbObject["target"];
  payload: VerificationDbObject["payload"];
}
export interface CreatePlaceArg extends Partial<PlaceDbObject> {
  name: PlaceDbObject["name"]
  lat: PlaceDbObject["lat"]
  lng: PlaceDbObject["lng"]
  address: PlaceDbObject["address"]
}

export type CreateRideArg = Omit<RideDbObject, "createdAt" | "status">
