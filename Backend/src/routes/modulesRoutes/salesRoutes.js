import express from 'express';
import {
  deleteSalesController,
  getSalesController,
  insertSalesController,
  updateSalesController,
} from '../../controllers/modulesControllers.js';
import { authenticateUser } from '../../middlewares/authenticateUser.js';
import { checkRoleAgent } from '../../middlewares/checkRoles/checkRoleAgentMiddleware.js';

export const salesRouter = express.Router();

// Crear venta
salesRouter.post(
  '/sales/create',
  authenticateUser,
  checkRoleAgent,
  insertSalesController
);

// Modificar venta
salesRouter.put(
  '/sales/update/:id_sale',
  authenticateUser,
  checkRoleAgent,
  updateSalesController
);

// Eliminar venta
salesRouter.delete(
  '/sales/delete/:id_sale',
  authenticateUser,
  checkRoleAgent,
  deleteSalesController
);

salesRouter.get('/sales/list', authenticateUser, checkRoleAgent, getSalesController);
