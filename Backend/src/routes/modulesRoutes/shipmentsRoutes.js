import express from 'express';
import {
  closeShipmentController,
  deleteShipmentController,
  shipmentCreateController,
  shipmentUpdateController,
} from '../../controllers/modulesControllers.js';
import { shipmentExist } from '../../middlewares/shipmentExist.js';
import { authenticateUser } from '../../middlewares/authenticateUser.js';
import { adminAuthMiddleware } from '../../middlewares/adminAuthMiddleware.js';

export const shipmentRouter = express.Router();

// Creacion de un envio
shipmentRouter.post('/shipment/create', shipmentCreateController);

// Modificacion de un envio
shipmentRouter.put(
  '/shipment/update/:shipmentId',
  authenticateUser,
  shipmentExist,
  shipmentUpdateController
);

// Borrado de un envio
shipmentRouter.delete(
  '/shipment/delete/:shipmentId',
  authenticateUser,
  adminAuthMiddleware,
  shipmentExist,
  deleteShipmentController
);

// Completar un envio
shipmentRouter.put(
  '/shipment/closed/:shipmentId',
  authenticateUser,
  shipmentExist,
  closeShipmentController
);
