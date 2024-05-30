import express from 'express';
import {
  closeShipmentStatusController,
  deleteShipmentController,
  shipmentCreateController,
  shipmentUpdateController,
  shipmentRouteController,
} from '../../controllers/modulesControllers.js';
import { shipmentExist } from '../../middlewares/shipmentExist.js';
import { authenticateUser } from '../../middlewares/authenticateUser.js';
import { adminAuthMiddleware } from '../../middlewares/adminAuthMiddleware.js';
import { getShipmentSearchController } from '../../controllers/Modules/shipment/getShipmentSearchController.js';
import { checkRoleDelivery } from '../../middlewares/checkRoles/checkRoleDeliveryMiddleware.js';
import { getPendingDeliveryNotesController } from '../../controllers/Modules/shipment/getPendingDeliveryNotesController.js';
import { shipmentByDelivererController } from '../../controllers/Modules/shipment/shipmentByDelivererController.js';
import { shipmentFeedbackController } from '../../controllers/Modules/shipment/shipmentFeedbackController.js';
import { checkFeedbackController } from '../../controllers/Modules/shipment/checkFeedbackController.js';


export const shipmentRouter = express.Router();

// Creacion de un envio
shipmentRouter.post('/shipment/create', authenticateUser, shipmentCreateController);

// Modificacion de un envio
shipmentRouter.put('/shipment/update/:shipmentId', authenticateUser, shipmentExist, shipmentUpdateController);

// Borrado de un envio
shipmentRouter.delete('/shipment/delete/:shipmentId', authenticateUser, adminAuthMiddleware, shipmentExist, deleteShipmentController);

//Completar un envio
shipmentRouter.put(
  '/shipment/closed/:shipmentId',
  authenticateUser,
  shipmentExist,
  closeShipmentStatusController
);

// Ruta para obtener la hoja de ruta de los repartidores
shipmentRouter.get('/shipment/list', authenticateUser, checkRoleDelivery, shipmentRouteController);

// Ruta para buscar envíos por término de búsqueda
shipmentRouter.get('/shipment/search', authenticateUser, adminAuthMiddleware, getShipmentSearchController);

// Nueva ruta para obtener las notas de entrega pendientes
shipmentRouter.get('/shipment/pending-delivery-notes', authenticateUser, getPendingDeliveryNotesController);

// Ruta para obtener los envios asociados a los repartidores 
shipmentRouter.get('/shipment/deliverer', shipmentByDelivererController);

// Ruta recibir valoración del cliente 
shipmentRouter.put('/shipment/feedback/:ref_SH', shipmentFeedbackController);

// Ruta si la valoración ya fue valorada

shipmentRouter.get('/shipment/check-feedback/:ref_SH', checkFeedbackController);
