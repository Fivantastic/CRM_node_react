import express from 'express';
import { moduleRouter } from './modulesRoutes/moduleRoutes.js';
import { visitsRouter } from './modulesRoutes/visitsRoutes.js';
import { salesRouter } from './modulesRoutes/salesRoutes.js';
import { invoicesRouter } from './modulesRoutes/invoicesRoutes.js';
import { paymentsRouter } from './modulesRoutes/paymentsRoutes.js';
import { deliveryNoteRouter } from './modulesRoutes/deliveryNoteRoutes.js';
import { shipmentRouter } from './modulesRoutes/shipmentsRoutes.js';


// Creamos el router
export const modulesRoutes = express.Router();

// Ruta de modulos generales
modulesRoutes.use(moduleRouter);

// Ruta de visitas
modulesRoutes.use(visitsRouter);

// Rutas de ventas
modulesRoutes.use(salesRouter);

// Ruta de facturas
modulesRoutes.use(invoicesRouter);

// Ruta de pagos
modulesRoutes.use(paymentsRouter);

// Ruta de Albaran
modulesRoutes.use(deliveryNoteRouter);

// Ruta de envios
modulesRoutes.use(shipmentRouter);
