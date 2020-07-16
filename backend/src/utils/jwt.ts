import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "@/models/User";
import { AuthCookiesResponse } from "@/Interfaces";
import apolloError from "./apolloError";

const secret = process.env.JWT_ACCESS_TOKEN;

export function createJWT(id: mongoose.Types.ObjectId) {
  return jwt.sign({ id }, secret, { expiresIn: "1d" });
}

export async function decodeJWTAndGetUser(authorization: AuthCookiesResponse) {
  if (!authorization["access-token"]) throw apolloError({ type: "AuthenticationRequiredError" });

  const data = jwt.verify(authorization["access-token"], secret) as {id?: mongoose.Types.ObjectId};
  const _id = data.id;
  const user = await User.findById(_id);
  console.log(JSON.stringify({ user }, null, 2));
  if (!user) throw apolloError({ type: "NotFoundInDBError" });

  return user;
}
