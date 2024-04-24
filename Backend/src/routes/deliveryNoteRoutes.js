import express from 'express';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import { checkRole } from '../middlewares/checkRole.js';
import { createDeliveryNoteController } from '../controllers/Modules/deliveryNote/createDeliveryNoteController.js';

export const deliveryNoteRoutes = express.Router();

// Ruta para crear albarán de reparto
deliveryNoteRoutes.post( '/delivery-notes', authenticateUser, checkRole(['deliverer', 'admin']), // Verificar roles permitidos
  createDeliveryNoteController);

