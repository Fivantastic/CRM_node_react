import express from 'express';
import { authenticateUser } from '../../middlewares/authenticateUser.js';
import { checkRole } from '../../middlewares/checkRole.js';
import { 
    createDeliveryNoteController, 
    closeDeliveryNoteController 
} from '../../controllers/modulesControllers.js';

export const deliveryNoteRoutes = express.Router();

// Ruta para crear albarán de reparto
deliveryNoteRoutes.post( '/delivery-notes', authenticateUser, checkRole(['deliverer', 'admin']), createDeliveryNoteController);

// Ruta para cerrar el reparto y autenticar los roles
deliveryNoteRoutes.put('/delivery-notes/close/:id', authenticateUser, checkRole(['deliverer', 'admin']),  closeDeliveryNoteController);


