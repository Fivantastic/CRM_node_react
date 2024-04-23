import express from 'express';
import { newProductControllers } from '../controllers/products/newProductController.js';
import { productListController } from '../controllers/products/productListController.js';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import { adminAuthMiddleware } from '../middlewares/adminAuthMiddleware.js';

export const productRouter = express.Router();

productRouter.post(
  '/product/register',
  authenticateUser,
  adminAuthMiddleware,
  newProductControllers
);

productRouter.get('/product/list', productListController);
