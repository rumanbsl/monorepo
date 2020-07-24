import { UserDbObject, VerificationDbObject, PlaceDbObject, RideDbObject, ChatDbObject, MessageDbObject } from "./gql-definitions";
export type UnPromisify<T> = T extends Promise<infer U> ? U : T;

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
export type CreateChatArg = Omit<ChatDbObject, "createdAt" | "messages">
export type CreateMessageArg = Omit<MessageDbObject, "createdAt">
