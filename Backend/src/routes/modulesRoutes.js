import express from 'express';
import { moduleRouter } from './modulesRoutes/moduleRoutes.js';
import { visitsRouter } from './modulesRoutes/visitsRoutes.js';
import { salesRouter } from './modulesRoutes/salesRoutes.js';
import { deliveryNoteRouter } from './modulesRoutes/deliveryNoteRoutes.js';

// Creamos el router
export const modulesRoutes = express.Router();

// Ruta de modulos generales
modulesRoutes.use(moduleRouter);

// Ruta de visitas
modulesRoutes.use(visitsRouter);

// Rutas de ventas
modulesRoutes.use(salesRouter);

// Ruta de Albaran
modulesRoutes.use(deliveryNoteRouter);