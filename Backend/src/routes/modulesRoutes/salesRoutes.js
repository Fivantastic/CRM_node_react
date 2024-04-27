import express from 'express';
import { 
    insertSalesController 
} from '../../controllers/modulesControllers.js';

export const salesRouter = express.Router();

// Ruta de venta
salesRouter.post('/sales', insertSalesController);
