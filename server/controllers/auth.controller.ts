import { NextFunction, Request, Response, Router } from "express";
import auth, { isAdmin } from "../utils/auth";
import {
  createUser,
  getAllUsers,
  getCurrentUser,
  login,
  updateUser,
} from "../services/auth.service";

import AuthenticatedRequest from "../types/AuthenticatedReq.types";

const router = Router();

router.post(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await createUser(req.body.user);

      res.json({ user });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/users/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await login(req.body.user);
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/user",
  auth.required,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const user = await getCurrentUser(req.auth?.username as string);
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/users",
  isAdmin,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const user = await getAllUsers();
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/user",
  auth.required,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const user = await updateUser(
        req.body.user,
        req.auth?.username as string
      );
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
