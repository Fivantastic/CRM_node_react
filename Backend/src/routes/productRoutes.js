import express from 'express';
import { newProductControllers } from '../controllers/products/newProductController.js';
import { productListController } from '../controllers/products/productListController.js';


export const productRouter = express.Router();

productRouter.post('/product/register', newProductControllers);

productRouter.get('/product/list', productListController);

