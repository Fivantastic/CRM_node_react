import express from 'express';
import { newCustomerControllers } from '../controllers/customer/newCustomerController.js';
import { customerExists } from '../middlewares/customerExists.js';
import { updateCustomerController } from '../controllers/customer/updateCustomerController.js';

// Creamos un router
export const customerRouter = express.Router();

// Ruta cliente
customerRouter.post('/customer/register', newCustomerControllers);

customerRouter.put(
  '/customer/:customerId',
  customerExists,
  updateCustomerController
);
