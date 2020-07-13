import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const secret = process.env.JWT_SECRET_KEY;

export function createJWT(id: mongoose.Types.ObjectId) {
  return jwt.sign({ id }, secret);
}

export function decodeJWT(token: string) {
  const data = jwt.verify(token, secret) as {id?: mongoose.Types.ObjectId};
  return data.id;
}
