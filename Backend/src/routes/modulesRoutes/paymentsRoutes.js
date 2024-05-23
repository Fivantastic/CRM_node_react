import express from 'express';
import {
  newPaymentController,
  cancelPaymentController,
  deletePaymentController,
  getPaymentsController,
  getPaymentSearchController
} from '../../controllers/modulesControllers.js';
import { authenticateUser } from '../../middlewares/authenticateUser.js';
import { checkRoleDelivery } from '../../middlewares/checkRoles/checkRoleDeliveryMiddleware.js';


export const paymentsRouter = express.Router();
// Creacion de un pago
paymentsRouter.post('/payments/create', authenticateUser, checkRoleDelivery, newPaymentController);

//Cambiar el estado del pago: a 'pending', 'cancelled' o 'paid'
paymentsRouter.put('/payments/status', authenticateUser, checkRoleDelivery, cancelPaymentController);

// Eliminar un pago
paymentsRouter.delete('/payments/delete/:paymentsId', authenticateUser, deletePaymentController);

paymentsRouter.get('/payments/list', authenticateUser, checkRoleDelivery, getPaymentsController);
paymentsRouter.get('/payments/search', authenticateUser, checkRoleDelivery, getPaymentSearchController);
