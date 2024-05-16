import express from 'express';
import { authenticateUser } from '../../middlewares/authenticateUser.js';
import { createDeliveryNoteController, closeDeliveryNoteController, deleteDeliveryNoteController,getDeliveryNotesController } from '../../controllers/modulesControllers.js'; 
import { checkRoleDelivery } from '../../middlewares/checkRoles/checkRoleDeliveryMiddleware.js';
import { adminAuthMiddleware } from '../../middlewares/adminAuthMiddleware.js';
import { getDeliveryNoteSearchController } from '../../controllers/Modules/deliveryNote/getDeliveryNoteSearchController.js'; 


// Crea una instancia del enrutador de Express
const router = express.Router();

// Ruta para obtener las notas de entrega
router.get('/deliveryNotes', getDeliveryNotesController);

// Ruta para crear albarán de reparto
router.post(
  '/delivery-notes',
  authenticateUser,
  checkRoleDelivery,
  createDeliveryNoteController
);

// Ruta para cerrar el reparto y autenticar los roles
router.put(
  '/deliveryNotes/close/:deliveryNote_id',
  authenticateUser,
  checkRoleDelivery,
  closeDeliveryNoteController
);

// Ruta para eliminar un albarán
router.delete(
  '/deliveryNotes/delete/:deliveryNote_id',
  authenticateUser,
  adminAuthMiddleware,
  deleteDeliveryNoteController
);

// Ruta para buscar notas de entrega por término de búsqueda
router.get('/deliveryNotes/search', authenticateUser, adminAuthMiddleware, getDeliveryNoteSearchController);

// Exporta el enrutador
export default router;
