import { NextFunction, Request, Response, Router } from "express";
import auth, { isAdmin } from "../utils/auth";
import multer from "multer";
import {
  addProduct,
  getAllProducts,
  getCurrentProduct,
  deleteProduct,
  searchProducts,
  getAllCategories,
  getProductByCategories,
} from "../services/product.service";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Uploads will be stored in the 'uploads/' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage: storage });

router.post(
  "/product",
  upload.single("image"),
  isAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productData = req.body;
      console.log(req.body);
      if (!req.file) return;
      const imageUrl = req.file.path;

      productData.image = imageUrl;

      const product = await addProduct(productData);

      res.json({ product });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/product/:productId",

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
  "/categories",

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await getAllCategories();
      res.json({ categories });
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/c/products",

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await getProductByCategories(req.query.cat as string);
      res.json({ categories });
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/s",

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await searchProducts(req.query.q as string);
      res.json({ products });
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
  isAdmin,
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
