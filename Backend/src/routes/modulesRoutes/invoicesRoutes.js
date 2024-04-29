import express from 'express';
import { authenticateUser } from '../../middlewares/authenticateUser.js';
import { newInvoiceController } from '../../controllers/Modules/invoices/newInvoiceController.js';

export const invoicesRouter = express.Router();

// Creacion de una nueva factura
invoicesRouter.post('/user/module/invoice', authenticateUser, newInvoiceController);

// Modificacion de una factura

// Borrado de una factura

// Cerrar una  factura 