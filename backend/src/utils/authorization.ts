import jwt from "jsonwebtoken";
import User from "@/models/User";
import { AuthCookiesResponse, ObjectID } from "@/Interfaces";
import { Response } from "express";
import apolloError from "./apolloError";
import OID from "./OID";

const { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } = process.env;

export function createAccessToken(payload: {id: ObjectID}) {
  return jwt.sign(payload, JWT_ACCESS_TOKEN, { expiresIn: "15m" });
}
export function createRefreshToken(payload: {id: ObjectID}) {
  return jwt.sign(payload, JWT_REFRESH_TOKEN, { expiresIn: "7d" });
}

export async function decodeJWTAndGetUser(authorization: AuthCookiesResponse) {
  if (!authorization["access-token"]) throw apolloError({ type: "AuthenticationRequiredError", data: authorization });

  const data = jwt.verify(authorization["access-token"], JWT_ACCESS_TOKEN) as {id?: string};
  const _id = OID(data.id);
  const user = await User.findById(_id);
  if (!user) throw apolloError({ type: "NotFoundInDBError" });

  return user;
}

export function setTokenInCookie(res: Response, token: string, cookieName: "refresh-token" | "access-token" | "all") {
  if (cookieName === "all") {
    res.cookie("refresh-token", token, { httpOnly: true });
    res.cookie("access-token", token, { httpOnly: true });
  } else {
    res.cookie(cookieName, token, { httpOnly: true });
  }
}

export function extractAuthHeader(token: unknown) {
  if (typeof token !== "string") throw apolloError({ type: "AuthenticationRequiredError", data: { token } });
  const [Bearer, authToken] = token.split(" ").filter(Boolean);
  if (Bearer !== "Bearer" || !authToken) throw apolloError({ type: "AuthenticationRequiredError" });
  return authToken;
}
