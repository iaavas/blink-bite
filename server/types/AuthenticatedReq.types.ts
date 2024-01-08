import { Request } from "express";
export default interface AuthenticatedRequest extends Request {
  auth?: {
    username: string;
  };
}
