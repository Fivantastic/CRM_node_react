import express from 'express';
import { insertSalesController } from '../controllers/sales/insertSalesController.js';

export const salesRouter = express.Router();

// Ruta de venta
salesRouter.post('/sales', insertSalesController);
