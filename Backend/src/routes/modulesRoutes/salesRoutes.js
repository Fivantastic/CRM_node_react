import express from 'express';
import { 
    deleteSalesController,
    insertSalesController, updateSalesController 
} from '../../controllers/modulesControllers.js';
import { authenticateUser } from '../../middlewares/authenticateUser.js';

export const salesRouter = express.Router();

// Crear venta
salesRouter.post('/sales/create', authenticateUser, insertSalesController);

// Modificar venta
salesRouter.put('/sales/update/:id_salesOrder', authenticateUser, updateSalesController)

// Eliminar venta
salesRouter.delete('sales/delete/:id_salesOrder', authenticateUser, deleteSalesController)