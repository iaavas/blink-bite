import { NextFunction, Request, Response, Router } from "express";
import auth from "../utils/auth";
import { getProfile } from "../services/profile.service";
import AuthenticatedRequest from "../types/AuthenticatedReq.types";

const router = Router();

router.get(
  "/profiles/:username",
  auth.optional,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const profile = await getProfile(
        req.params?.username,
        req.auth?.username as string
      );
      res.json({ profile });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
