import { expressjwt as jwt } from "express-jwt";
import { NextFunction, Request, Response, Router } from "express";
import * as jswt from "jsonwebtoken";

const getTokenFromHeaders = (req: {
  headers: { authorization: string };
}): string | null => {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const auth = {
  required: jwt({
    secret: process.env.JWT_SECRET || "superSecret",
    // @ts-ignore
    getToken: getTokenFromHeaders,
    algorithms: ["HS256"],
  }),
  optional: jwt({
    secret: process.env.JWT_SECRET || "superSecret",
    credentialsRequired: false,
    // @ts-ignore
    getToken: getTokenFromHeaders,
    algorithms: ["HS256"],
  }),
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const token = getTokenFromHeaders(req);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  // @ts-ignore
  console.log(token);

  jswt.verify(
    token,
    process.env.JWT_SECRET || "superSecret",

    // @ts-ignore
    (err, decoded: JwtPayload | undefined) => {
      console.log(decoded);
      if (err) {
        return res.status(401).json({ error: err });
      }

      if (decoded && decoded.role === "ADMIN") {
        next();
      } else {
        return res.status(403).json({ error: "Forbidden" });
      }
    }
  );
};

export default auth;
