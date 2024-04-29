import express from 'express';
import { shipmentCreateController } from '../../controllers/modulesControllers.js';

export const shipmentRouter = express.Router();

// Creacion de un envio
shipmentRouter.post('/shipment/create', shipmentCreateController);

// Modificacion de un envio
shipmentRouter.put('/shipment/update/:shipmentId');

// Borrado de un envio
shipmentRouter.delete('/shipment/delete/:shipmentId');

// Completar un envio
shipmentRouter.put('/shipment/closed/:shipmentId');
