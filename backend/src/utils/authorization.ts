import jwt from "jsonwebtoken";
import User from "@/models/User";
import { AuthShape, ObjectID } from "@/Interfaces";
import { Response } from "express";
import apolloError from "./apolloError";
import OID from "./OID";
import extractCookies from "../../../common/utils/extractCookies";

const { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN } = process.env;

export function createAccessToken(payload: {id: ObjectID}) {
  return jwt.sign(payload, JWT_ACCESS_TOKEN, { expiresIn: "15m" });
}
export function createRefreshToken(payload: {id: ObjectID; tokenVersion: number}) {
  return jwt.sign(payload, JWT_REFRESH_TOKEN, { expiresIn: "7d" });
}

export async function decodeJWTAndGetUser(authorization: AuthShape, opt: { gqlType:boolean } = { gqlType: true }) {
  const token = authorization["access-token"] || authorization["refresh-token"] || "";
  if (!token) {
    if (opt.gqlType) throw apolloError({ type: "AuthenticationRequiredError", data: authorization });
    throw new Error("access-token invalid or expired");
  }
  const data = jwt.verify(
    token,
    authorization["access-token"] ? JWT_ACCESS_TOKEN : JWT_REFRESH_TOKEN,
  ) as {id?: string; tokenVersion?: number};
  const _id = OID(data.id);
  const user = await User.findById(_id);
  if (!user) {
    if (opt.gqlType) throw apolloError({ type: "NotFoundInDBError" });
    throw new Error("Record do not exists!");
  }

  return { user, token: data };
}

export function setRefreshTokenInCookie(res: Response, token: string) {
  res.cookie("refresh-token", token, {
    sameSite : "strict",
    httpOnly : true,
    ...(token.length === 0 ? {} : { maxAge: 7 * 24 * 60 * 60 * 1000 }),
  });
}

export function extractAuthHeader(token: unknown) {
  if (typeof token !== "string") throw apolloError({ type: "AuthenticationRequiredError", data: { token } });
  const [Bearer, authToken] = token.split(" ").filter(Boolean);
  if (Bearer !== "Bearer" || !authToken) throw apolloError({ type: "AuthenticationRequiredError", data: { token } });
  return authToken;
}

export function extractAuthCookies(token: unknown) {
  if (token && typeof token === "object" && ("access-token" in token || "refresh-token" in token)) {
    return token as AuthShape;
  }
  if (typeof token !== "string") throw apolloError({ type: "AuthenticationRequiredError", data: { token } });
  const authCookies:AuthShape = extractCookies(token);
  return authCookies;
}
