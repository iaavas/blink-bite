import { NextFunction, Request, Response, Router } from "express";
import auth, { isAdmin } from "../utils/auth";
import {
  addProduct,
  getAllProducts,
  getCurrentProduct,
  deleteProduct,
} from "../services/product.service";

const router = Router();

router.post(
  "/product",
  isAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await addProduct(req.body);

      res.json({ product });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/product/:productId",
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await getCurrentProduct(req.params.productId as string);
      res.json({ product });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/product",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await getAllProducts();
      res.json({ products });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/product/:productId",
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await deleteProduct(req.params.productId as string);
      res.json({ product });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
