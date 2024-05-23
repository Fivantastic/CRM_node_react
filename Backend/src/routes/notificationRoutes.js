import express from 'express';
import { createDeliveryNoteController } from '../controllers/Modules/deliveryNote/createDeliveryNoteController.js';

const router = express.Router();

const configureNotificationRoutes = (emitDeliveryAssigned) => {
  // Ruta para crear un albarán y asignar un repartidor
  router.post('/delivery-notes', createDeliveryNoteController(emitDeliveryAssigned));

  // Puedes agregar más rutas relacionadas con notificaciones aquí

  return router;
};

export default configureNotificationRoutes;
