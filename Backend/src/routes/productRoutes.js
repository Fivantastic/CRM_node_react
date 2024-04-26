import express from 'express';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import { adminAuthMiddleware } from '../middlewares/adminAuthMiddleware.js';
import { productExist } from '../middlewares/productExist.js';
import { newProductController } from '../controllers/product/newProductController.js';
import { deleteProductController } from '../controllers/product/deleteProductController.js';
import { productListController } from '../controllers/product/productListController.js';
import { selectSaleProductController } from '../controllers/product/selectSaleProductController.js';


export const productRouter = express.Router();

// Crear un nuevo producto (solo Admin)
productRouter.post('/product/register', authenticateUser, adminAuthMiddleware, newProductController);

// Eliminar un producto (solo Admin)
productRouter.delete('/product/delete/:product_id', authenticateUser, adminAuthMiddleware, deleteProductController)

// Obtener la lsita de productos
productRouter.get('/product/list', authenticateUser, productListController);

// Obtener producto para la venta
productRouter.post('/sales-product/:productId', productExist, selectSaleProductController);
