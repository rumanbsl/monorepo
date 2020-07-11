import jwt from "jsonwebtoken";
import { ObjectID } from "@/Interfaces";

const secret = process.env.JWT_SECRET_KEY;

export function createJWT(id: ObjectID) {
  return jwt.sign({ id }, secret);
}

export function decodeJWT(token: string) {
  const data = jwt.verify(token, secret) as {id?: ObjectID};
  return data.id;
}
// todo invalid token InvalidTokenError
