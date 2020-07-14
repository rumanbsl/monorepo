import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "@/models/User";
import apolloError from "./apolloError";

const secret = process.env.JWT_SECRET_KEY;

export function createJWT(id: mongoose.Types.ObjectId) {
  return jwt.sign({ id }, secret);
}

export async function decodeJWTAndGetUser(authorization: unknown) {
  if (typeof authorization !== "string") throw apolloError({ type: "AuthenticationRequiredError" });

  const [Bearer, authToken] = authorization.split(" ").filter(Boolean);
  if (Bearer !== "Bearer" || !authToken) throw apolloError({ type: "AuthenticationRequiredError" });

  const data = jwt.verify(authToken, secret) as {id?: mongoose.Types.ObjectId};
  const _id = data.id;
  const user = await User.findById(_id);

  if (!user) throw apolloError({ type: "NotFoundInDBError" });

  return user;
}
