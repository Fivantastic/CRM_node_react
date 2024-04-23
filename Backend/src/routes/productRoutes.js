import express from 'express';
import { newProductControllers } from '../controllers/products/newProductController.js';
import { updateProductController } from '../controllers/products/updateProductController.js';

export const productRouter = express.Router();

// Agregar producto
productRouter.post('/product/register', newProductControllers);

// Modificar Producto
productRouter.put('/product/:id_product', updateProductController)