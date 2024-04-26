import express from 'express';
import { authenticateUser } from '../../middlewares/authenticateUser.js';
import { adminAuthMiddleware } from '../../middlewares/adminAuthMiddleware.js';
import {
    newVisitController,
    getUserVisitsController,
    updateVisitController,
    deleteVisitController,
    closeVisitController,
    feedbackVisitController
} from '../../controllers/modulesControllers.js';

export const visitsRouter = express.Router()

// Crear una nueva visita
visitsRouter.post('/user/module/visit', authenticateUser, newVisitController);

// Listar visitas
visitsRouter.get('/user/module/visits/list', authenticateUser, getUserVisitsController);

// Modificar una visita
visitsRouter.put('/user/module/visit/:visitId', authenticateUser, updateVisitController);

// Borrar una visita
visitsRouter.delete('/user/module/delete/visit/:visitId', authenticateUser, adminAuthMiddleware, deleteVisitController);

// Completar una visita y enviar valoacion al cliente
visitsRouter.put('/user/module/visit/complete/:visitId', authenticateUser, closeVisitController);

// Recibir e insertar la valoracion del cliente
visitsRouter.put('/user/module/visit/feedback/:visitId', feedbackVisitController);