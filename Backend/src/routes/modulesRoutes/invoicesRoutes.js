import express from 'express';
import { authenticateUser } from '../../middlewares/authenticateUser.js';
import { checkRoleAgent } from '../../middlewares/checkRoles/checkRoleAgentMiddleware.js';
import {
  statusUpdateInvoiceController,
  deleteInvoiceController,
  newInvoiceController,
  getInvoiceController,
} from '../../controllers/modulesControllers.js';

export const invoicesRouter = express.Router();

// Creacion de una nueva factura
invoicesRouter.post(
  '/invoice',
  authenticateUser,
  checkRoleAgent,
  newInvoiceController
);

// Modificacion de una factura
//? En las apps de facturas no se puede modificar la factura, solo borrarla

// Borrado de una factura
invoicesRouter.delete(
  '/invoice/:invoiceId',
  authenticateUser,
  checkRoleAgent,
  deleteInvoiceController
);

// Cerrar una  factura
invoicesRouter.put(
  '/invoice/close/:invoiceId',
  authenticateUser,
  checkRoleAgent,
  statusUpdateInvoiceController
);

// Lista de facturas
invoicesRouter.get(
  '/invoice',
  authenticateUser,
  checkRoleAgent,
  getInvoiceController
);
