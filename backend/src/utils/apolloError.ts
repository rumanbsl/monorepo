/* eslint-disable max-len */
import { createError, ErrorConfig } from "apollo-errors";

type ErrorType = "UnknownError"
  | "ForbiddenError"
  | "AuthenticationRequiredError"
  | "TeamExistsError"
  | "OnlyOneIndividualTeamError"
  | "ValidationError";

interface ErrConfig extends Omit<ErrorConfig, "message"> {
  type: ErrorType;
  message?: string;
}
export default function apolloError(errorConfig: ErrConfig) {
  const { type, message, ...rest } = errorConfig;
  let msg = message || "";
  if (!msg) {
    switch (type) {
    case "UnknownError":
      msg = "An unknown error has occurred!  Please try again later";
      break;
    case "ForbiddenError":
      msg = "You are not allowed to do this";
      break;
    case "AuthenticationRequiredError":
      msg = "You must be logged in to do this";
      break;
    case "TeamExistsError":
      msg = "Team already exists";
      break;
    case "OnlyOneIndividualTeamError":
      msg = "Only One Individual Team allowed";
      break;
    case "ValidationError":
      msg = "Invalid input";
      break;

    default:
      msg = "An unknown error has occurred!  Please try again later";
      break;
    }
  }
  const Err = createError(type, { message: msg });
  return new Err(rest);
}
