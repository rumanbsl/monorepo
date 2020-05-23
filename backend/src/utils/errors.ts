import { createError } from "apollo-errors";

export default {
  UnknownError                : createError("UnknownError", { message: "An unknown error has occurred!  Please try again later" }),
  ForbiddenError              : createError("ForbiddenError", { message: "You are not allowed to do this" }),
  AuthenticationRequiredError : createError("AuthenticationRequiredError", { message: "You must be logged in to do this" }),
  TeamExistsError             : createError("TeamExistsError", { message: "Team already exists" }),
  OnlyOneIndividualTeamError  : createError("OnlyOneIndividualTeamError", { message: "Only One Individual Team allowed" }),
  ValidationError             : createError("ValidationError", { message: "Invalid input" }),
};
