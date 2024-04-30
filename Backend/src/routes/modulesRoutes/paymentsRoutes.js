import express from 'express';
import { newPaymentController, cancelPaymentController } from '../../controllers/modulesControllers.js';
import { authenticateUser } from '../../middlewares/authenticateUser.js';

export const paymentsRouter = express.Router();
// Creacion de un pago
paymentsRouter.post('/payments/create', authenticateUser, newPaymentController);


//TODO Cancelar un pago (en vez de eliminar, registrar como cancelado)
paymentsRouter.put('/payments/cancel', authenticateUser, cancelPaymentController); // No paso el payment_id por seguridad y privacidad

//TODO Cerrar un pago
// paymentsRouter.put('/payments/close', authenticateUser, controller); // No paso el payment_id por seguridad y privacidad