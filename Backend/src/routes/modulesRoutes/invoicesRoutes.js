import express from 'express';
import { authenticateUser } from '../../middlewares/authenticateUser.js';
import { checkRoleAgent } from '../../middlewares/checkRoles/checkRoleAgentMiddleware.js';
import {
  statusUpdateInvoiceController,
  deleteInvoiceController,
  newInvoiceController,
  getInvoiceController,
  getInvoiceSearchController,
} from '../../controllers/modulesControllers.js';
import { getUnasignedSalesController } from '../../controllers/Modules/invoices/salesInvoiceController.js';

export const invoicesRouter = express.Router();

// Creacion de una nueva factura
invoicesRouter.post(
  '/invoice/create',
  authenticateUser,
  checkRoleAgent,
  newInvoiceController
);

// Modificacion de una factura
//? En las apps de facturas no se puede modificar la factura, ni borrarla

// Borrado de una factura
invoicesRouter.delete(
  '/invoice/delete/:invoiceId',
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

// Buscar facturas
invoicesRouter.get(
  '/invoice/search',
  authenticateUser,
  checkRoleAgent,
  getInvoiceSearchController
);

// Obtener facturas sin asignar
invoicesRouter.get(
  '/invoice/unasigned-sales', 
  authenticateUser, 
  getUnasignedSalesController
);