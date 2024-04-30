import express from 'express';
import { authenticateUser } from '../../middlewares/authenticateUser.js';
import { newInvoiceController } from '../../controllers/modulesControllers.js';
import { checkRoleAgent } from '../../middlewares/checkRoles/checkRoleAgentMiddleware.js';

export const invoicesRouter = express.Router();

// Creacion de una nueva factura
invoicesRouter.post('/user/module/invoice', authenticateUser, checkRoleAgent, newInvoiceController);

// Modificacion de una factura

// Borrado de una factura

// Cerrar una  factura 