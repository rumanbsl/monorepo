import { UserDbObject, VerificationDbObject } from "./Interfaces/gql-definitions";

export interface CreateUserArg extends Partial<UserDbObject> {
  name: UserDbObject["name"]
}
export interface CreateVerificationArg extends Partial<VerificationDbObject> {
  target: VerificationDbObject["target"];
  payload: VerificationDbObject["payload"];
}
