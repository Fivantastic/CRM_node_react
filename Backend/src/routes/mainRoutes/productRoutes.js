import express from 'express';
import { authenticateUser } from '../../middlewares/authenticateUser.js';
import { adminAuthMiddleware } from '../../middlewares/adminAuthMiddleware.js';
import { productExist } from '../../middlewares/productExist.js';
import {
  newProductController,
  deleteProductController,
  productListController,
  selectSaleProductController,
  updateProductController,
  toggleActiveProductStatusController,
} from '../../controllers/mainControllers.js';
import { checkRoleAgent } from '../../middlewares/checkRoles/checkRoleAgentMiddleware.js';
import { getProductSearchController } from '../../controllers/product/getProductSearchController.js';

export const productRouter = express.Router();

// Crear un nuevo producto (solo Admin)
productRouter.post('/product/register', authenticateUser, adminAuthMiddleware, newProductController);

// Eliminar un producto (solo Admin)
productRouter.delete('/product/delete/:product_id', authenticateUser, adminAuthMiddleware, deleteProductController);

// Obtener la lista de productos
productRouter.get( '/product/list', authenticateUser, checkRoleAgent, productListController);

// Ruta para listar productos por nombre de producto
productRouter.get('/product/search', authenticateUser, checkRoleAgent, getProductSearchController);

// Obtener producto para la venta
productRouter.post('/sales-product/:productId', authenticateUser, checkRoleAgent, productExist, selectSaleProductController);

// Update product
productRouter.put('/product/update/:id_product', authenticateUser, adminAuthMiddleware, updateProductController);

// Activar y desactivar productos
productRouter.put('/product/toggleActivation', authenticateUser, adminAuthMiddleware, toggleActiveProductStatusController);

