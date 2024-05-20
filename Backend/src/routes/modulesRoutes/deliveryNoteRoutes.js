import express from 'express';
import { authenticateUser } from '../../middlewares/authenticateUser.js';
import { createDeliveryNoteController, closeDeliveryNoteController, deleteDeliveryNoteController, getDeliveryNotesController } from '../../controllers/modulesControllers.js';
import { checkRoleDelivery } from '../../middlewares/checkRoles/checkRoleDeliveryMiddleware.js';
import { adminAuthMiddleware } from '../../middlewares/adminAuthMiddleware.js';
import { getDeliveryNoteSearchController } from '../../controllers/Modules/deliveryNote/getDeliveryNoteSearchController.js';
import { getOpenSalesController } from '../../controllers/Modules/deliveryNote/salesDeliveryController.js';
import { getDeliverersController } from '../../controllers/Modules/deliveryNote/getDeliverersController.js';

// Crea una instancia del enrutador de Express
export const deliveryNoteRouter = express.Router();

// Ruta para obtener las notas de entrega
deliveryNoteRouter.get('/deliveryNotes/list', authenticateUser, checkRoleDelivery, getDeliveryNotesController);

// Ruta para crear albarán de reparto
deliveryNoteRouter.post('/delivery-notes', authenticateUser, checkRoleDelivery, createDeliveryNoteController);

// Ruta para cerrar el reparto y autenticar los roles
deliveryNoteRouter.put('/deliveryNotes/close/:deliveryNote_id', authenticateUser, checkRoleDelivery, closeDeliveryNoteController);

// Ruta para eliminar un albarán
deliveryNoteRouter.delete('/deliveryNotes/delete/:deliveryNote_id', authenticateUser, adminAuthMiddleware, deleteDeliveryNoteController);

// Ruta para buscar notas de entrega por término de búsqueda
deliveryNoteRouter.get('/deliveryNotes/search', authenticateUser, adminAuthMiddleware, getDeliveryNoteSearchController);

// Ruta de extracción de estados de la tabla Sales
deliveryNoteRouter.get('/deliveryNotes/open-sales', getOpenSalesController);

// Ruta para obtener los usuarios con el rol 'deliverer'
deliveryNoteRouter.get('/deliveryNotes/deliverers', getDeliverersController);
