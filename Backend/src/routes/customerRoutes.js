import express from 'express';
import { newCustomerControllers } from '../controllers/customer/newCustomerController.js';

// Creamos un router
export const customerRouter = express.Router();

// Ruta cliente
customerRouter.post('/customer/register', newCustomerControllers);
