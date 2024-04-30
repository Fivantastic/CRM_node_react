import express from 'express';
import {
  shipmentCreateController,
  shipmentUpdateController,
} from '../../controllers/modulesControllers.js';
import { shipmentExist } from '../../middlewares/shipmentExist.js';

export const shipmentRouter = express.Router();

// Creacion de un envio
shipmentRouter.post('/shipment/create', shipmentCreateController);

// Modificacion de un envio
shipmentRouter.put(
  '/shipment/update/:shipmentId',
  shipmentExist,
  shipmentUpdateController
);

// Borrado de un envio
shipmentRouter.delete('/shipment/delete/:shipmentId');

// Completar un envio
shipmentRouter.put('/shipment/closed/:shipmentId');
