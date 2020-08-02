/* eslint-disable max-len */
import { createError, ErrorConfig } from "apollo-errors";
import { ErrorType } from "common/Interfaces";

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
    case "AuthenticationFailedError":
      msg = "Username and password missmatch!";
      break;
    case "AlreadyExistsError":
      msg = "Records already exists";
      break;
    case "InvalidInputError":
      msg = "Input is not valid";
      break;
    case "ValidationError":
      msg = "Invalid input";
      break;
    case "NotFoundInDBError":
      msg = "Record do not exists!";
      break;
    case "InvalidTokenError":
      msg = "Token is not valid";
      break;
    case "PhoneNotVerifiedError":
      msg = "Phone number is not verified";
      break;

    default:
      msg = "An unknown error has occurred!  Please try again later";
      break;
    }
  }
  const Err = createError(type, { message: msg });
  return new Err(rest);
}
