import express from 'express';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import { checkRole } from '../middlewares/checkRole.js';
import { createDeliveryNoteController } from '../controllers/operationServices/createDeliveryNoteController.js';

const router = express.Router();

// Ruta para crear albarán de reparto
router.post( '/delivery-notes', authenticateUser, checkRole(['deliverer', 'admin']), // Verificar roles permitidos
  createDeliveryNoteController // Controlador para crear albarán
);

// Exportación con nombre
export const deliveryNoteRoutes = router;
