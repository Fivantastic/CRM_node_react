import express from 'express';
import { newProductControllers } from '../controllers/product/newProductController.js';
import { productListController } from '../controllers/product/productListController.js';
import { deleteProductController } from '../controllers/product/deleteProductController.js';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import { adminAuthMiddleware } from '../middlewares/adminAuthMiddleware.js';

export const productRouter = express.Router();

// Crear un nuevo producto (solo Admin)
productRouter.post('/product/register', authenticateUser, adminAuthMiddleware, newProductControllers);

// Eliminar un producto (solo Admin)
productRouter.delete('/product/delete/:product_id', authenticateUser, adminAuthMiddleware, deleteProductController)

// Obtener la lsita de productos
productRouter.get('/product/list', authenticateUser, productListController);
