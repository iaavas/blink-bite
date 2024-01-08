import { Router } from "express";

import authController from "../controllers/auth.controller";
import profileController from "../controllers/profile.controller";
import productController from "../controllers/product.controller";

const api = Router()
  .use(profileController)
  .use(authController)
  .use(productController);

export default Router().use("/api", api);
