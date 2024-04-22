import express from 'express';
import { newProductControllers } from '../controllers/products/newProductController.js';

export const productRouter = express.Router();

productRouter.post('/product/register', newProductControllers);
