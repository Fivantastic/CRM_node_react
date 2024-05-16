import express from 'express';
import {
  newPaymentController,
  cancelPaymentController,
  deletePaymentController,
  getPaymentsController,
} from '../../controllers/modulesControllers.js';
import { authenticateUser } from '../../middlewares/authenticateUser.js';

export const paymentsRouter = express.Router();
// Creacion de un pago
paymentsRouter.post('/payments/create', authenticateUser, newPaymentController);

//Cambiar el estado del pago: a 'pending', 'cancelled' o 'paid'
paymentsRouter.put('/payments/status', authenticateUser, cancelPaymentController);

// Eliminar un pago
paymentsRouter.delete('/payments/delete/:paymentsId', authenticateUser, deletePaymentController);

paymentsRouter.get('/payments/list', authenticateUser, getPaymentsController);
