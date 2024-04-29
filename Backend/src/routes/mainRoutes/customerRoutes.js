import express from 'express';
import { customerExists } from '../../middlewares/customerExists.js';
import { authenticateUser } from '../../middlewares/authenticateUser.js';
import { adminAuthMiddleware } from '../../middlewares/adminAuthMiddleware.js';
import { 
    deleteCustomerController,
    getCustomerListController, 
    newCustomerController, 
    updateCustomerController 
} from '../../controllers/mainControllers.js';
import { checkRoleAgent } from '../../middlewares/checkRoles/checkRoleAgentMiddleware.js';

// Creamos un router
export const customerRouter = express.Router();

// Agregar cliente
customerRouter.post('/customer/register', authenticateUser, checkRoleAgent, newCustomerController);

// Obtener lista de clientes
customerRouter.get('/customer/list', authenticateUser, checkRoleAgent, getCustomerListController);

// Modificar cliente
customerRouter.put('/customer/:customerId',authenticateUser, checkRoleAgent, customerExists, updateCustomerController);

// Eliminar cliente, solo para administradores
customerRouter.delete('/customer/delete/:customerId', authenticateUser, adminAuthMiddleware, deleteCustomerController);
