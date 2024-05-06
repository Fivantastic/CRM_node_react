import express from 'express';
import { authenticateUser } from '../../middlewares/authenticateUser.js';
import {
  createDeliveryNoteController,
  closeDeliveryNoteController,
  deleteDeliveryNoteController,
} from '../../controllers/modulesControllers.js';
import { checkRoleDelivery } from '../../middlewares/checkRoles/checkRoleDeliveryMiddleware.js';
import { adminAuthMiddleware } from '../../middlewares/adminAuthMiddleware.js';

export const deliveryNoteRouter = express.Router();

// Ruta para crear albarán de reparto
deliveryNoteRouter.post(
  '/delivery-notes',
  authenticateUser,
  checkRoleDelivery,
  createDeliveryNoteController
);

// Ruta para cerrar el reparto y autenticar los roles
deliveryNoteRouter.put(
  '/delivery-notes/close/:deliveryNote_id',
  authenticateUser,
  checkRoleDelivery,
  closeDeliveryNoteController
);

// Eliminar Un albaran
deliveryNoteRouter.delete(
  '/delivery-notes/delete/:deliveryNote_id',
  authenticateUser,
  adminAuthMiddleware,
  deleteDeliveryNoteController
);
