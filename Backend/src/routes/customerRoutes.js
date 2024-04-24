import express from 'express';
import { newCustomerControllers } from '../controllers/customer/newCustomerController.js';
import { customerExists } from '../middlewares/customerExists.js';
import { updateCustomerController } from '../controllers/customer/updateCustomerController.js';
import { getCustomerListController } from '../controllers/customer/getCustomerController.js';
import { authenticateUser } from '../middlewares/authenticateUser.js';

// Creamos un router
export const customerRouter = express.Router();

// Agregar cliente
customerRouter.post('/customer/register', authenticateUser, newCustomerControllers);

// Obtener lista de clientes
customerRouter.get('/customer/list', authenticateUser, getCustomerListController);

// Modificar cliente
customerRouter.put('/customer/:customerId',authenticateUser, customerExists, updateCustomerController);
