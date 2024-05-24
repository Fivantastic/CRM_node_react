import express from 'express';
import { customerExists } from '../../middlewares/customerExists.js';
import { authenticateUser } from '../../middlewares/authenticateUser.js';
import { adminAuthMiddleware } from '../../middlewares/adminAuthMiddleware.js';
import { 
    deleteCustomerController,
    getCustomerListController, 
    getCustomerSearchController, 
    newCustomerController, 
    toggleActiveCustomerStatusController, 
    updateCustomerController 
} from '../../controllers/mainControllers.js';

// Creamos un router
export const customerRouter = express.Router();

// Obtener lista de clientes
customerRouter.get('/customer/list', authenticateUser, getCustomerListController);

// Buscar cliente
customerRouter.get('/customer/search', authenticateUser, getCustomerSearchController);

// Agregar cliente
customerRouter.post('/customer/register', authenticateUser, newCustomerController);

// Modificar cliente
customerRouter.put('/customer/:customerId',authenticateUser, customerExists, updateCustomerController);

// Eliminar cliente, solo para administradores
customerRouter.delete('/customer/delete/:customerId', authenticateUser, adminAuthMiddleware, deleteCustomerController);

// Activar y desactivar clientes
customerRouter.put('/custo/active', authenticateUser, adminAuthMiddleware, toggleActiveCustomerStatusController);


