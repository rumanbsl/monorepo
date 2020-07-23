import jwt from "jsonwebtoken";
import User from "@/models/User";
import { AuthCookiesResponse, ObjectID } from "@/Interfaces";
import { Response } from "express";
import apolloError from "./apolloError";
import OID from "./OID";
import extractCookies from "../../../common/utils/extractCookies";

const { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } = process.env;

export function createAccessToken(payload: {id: ObjectID}) {
  return jwt.sign(payload, JWT_ACCESS_TOKEN, { expiresIn: "15m" });
}
export function createRefreshToken(payload: {id: ObjectID}) {
  return jwt.sign(payload, JWT_REFRESH_TOKEN, { expiresIn: "7d" });
}

export async function decodeJWTAndGetUser(authorization: AuthCookiesResponse, opt: { gqlType:boolean } = { gqlType: true }) {
  if (!authorization["refresh-token"]) {
    if (opt.gqlType) throw apolloError({ type: "AuthenticationRequiredError", data: authorization });
    throw new Error("refresh-token invalid or expired");
  }

  const data = jwt.verify(authorization["refresh-token"], JWT_REFRESH_TOKEN) as {id?: string};
  const _id = OID(data.id);
  const user = await User.findById(_id);
  if (!user) throw apolloError({ type: "NotFoundInDBError" });

  return user;
}

export function setTokenInCookie(res: Response, token: string, cookieName: "refresh-token" | "access-token" | "all") {
  if (cookieName === "all") {
    res.cookie("refresh-token", token, { httpOnly: true, maxAge: 15 * 60 * 1000 }); // 15 minutes
    res.cookie("access-token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // a week
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

export function extractAuthCookies(token: unknown) {
  if (token && typeof token === "object" && ("access-token" in token || "refresh-token" in token)) {
    return token as AuthCookiesResponse;
  }
  if (typeof token !== "string") throw apolloError({ type: "AuthenticationRequiredError", data: { token } });
  const authCookies:AuthCookiesResponse = extractCookies(token);
  return authCookies;
}
