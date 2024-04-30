import express from 'express';
import { authenticateUser } from '../../middlewares/authenticateUser.js';
import { checkRoleAgent } from '../../middlewares/checkRoles/checkRoleAgentMiddleware.js';
import { 
    deleteInvoiceController, 
    newInvoiceController 
} from '../../controllers/modulesControllers.js';

export const invoicesRouter = express.Router();

// Creacion de una nueva factura
invoicesRouter.post('/user/module/invoice', authenticateUser, checkRoleAgent, newInvoiceController);

// Modificacion de una factura

// Borrado de una factura
invoicesRouter.delete('/user/module/invoice/:invoiceId', authenticateUser, checkRoleAgent, deleteInvoiceController);

// Cerrar una  factura 