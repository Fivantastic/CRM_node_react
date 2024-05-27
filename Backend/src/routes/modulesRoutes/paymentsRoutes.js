import express from 'express';
import {
  newPaymentController,
  cancelPaymentController,
  deletePaymentController,
  getPaymentsController,
  getPaymentSearchController,
  getUnasignedInvoicesController
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

// Obtener lista de pagos
paymentsRouter.get('/payments/list', authenticateUser, checkRoleDelivery, getPaymentsController);

// Buscar pagos
paymentsRouter.get('/payments/search', authenticateUser, checkRoleDelivery, getPaymentSearchController);

// Obtener lista de facturas sin pago asignados
paymentsRouter.get('/payments/unasigned-invoices', authenticateUser, checkRoleDelivery, getUnasignedInvoicesController);
