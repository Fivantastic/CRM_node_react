import express from 'express';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import { checkRole } from '../middlewares/checkRole.js';
import { closeDeliveryNoteController } from '../controllers/Modules/deliveryNote/closeDeliveryNoteController.js';

export const router = express.Router();

// Ruta para cerrar el reparto y autenticar los roles
router.put('/delivery-notes/close/:id', authenticateUser, checkRole(['deliverer', 'admin']),  closeDeliveryNoteController);

// Exportación 
