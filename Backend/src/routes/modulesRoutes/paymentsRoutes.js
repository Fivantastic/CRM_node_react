import express from 'express';
import { newPaymentController, newVisitController } from '../../controllers/modulesControllers.js';
import { authenticateUser } from '../../middlewares/authenticateUser.js';

export const paymentsRouter = express.Router();
newVisitController
// Creacion de un pago
paymentsRouter.post('/payments/create', authenticateUser, newPaymentController);
// TODO Testear en BBDD

// No pasar el payment_id? (Por tema de seguridad)
//TODO Cancelar un pago (en vez de eliminar, registrar como cancelado)
// paymentsRouter.put('/payments/cancel'); 

//TODO Cerrar un pago
// paymentsRouter.put('/payments/close');