import jwt, { JwtPayload } from "jsonwebtoken";
import * as jose from "jose";

const secret = process.env.SECRETV || "test";

export const signToken = (payload: JwtPayload) => {
  return jwt.sign(payload, secret);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};

export const readPayloadJose = async <T>(token: string) => {
  const secretKey = new TextEncoder().encode(secret);
  const payloadJose = await jose.jwtVerify<T>(token, secretKey);

  return payloadJose.payload;
};
