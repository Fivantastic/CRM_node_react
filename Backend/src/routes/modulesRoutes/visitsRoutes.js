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
import { checkRoleAgent } from '../../middlewares/checkRoles/checkRoleAgentMiddleware.js';

export const visitsRouter = express.Router()

// Crear una nueva visita
visitsRouter.post('/visit/new', authenticateUser, checkRoleAgent, newVisitController);

// Listar visitas
visitsRouter.get('/visits/list', authenticateUser, checkRoleAgent, getUserVisitsController);

// Modificar una visita
visitsRouter.put('/visit/update/:visitId', authenticateUser, checkRoleAgent, updateVisitController);

// Borrar una visita
visitsRouter.delete('/visit/delete/:visitId', authenticateUser, adminAuthMiddleware, deleteVisitController);

// Completar una visita y enviar valoacion al cliente
visitsRouter.put('/visit/complete/:visitId', authenticateUser, checkRoleAgent, closeVisitController);

// Recibir e insertar la valoracion del cliente
visitsRouter.put('/visit/feedback/:visitId', feedbackVisitController);