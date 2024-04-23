import express from 'express';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import { checkRole } from '../middlewares/checkRole.js';
import { createOperationController } from '../controllers/operationServices/createOperationController.js';

const operationRoutes = express.Router();

// Rutas para crear operación con autenticación y roles
operationRoutes.post('/operations',authenticateUser,checkRole(['salesAgent', 'deliverer', 'admin']),
  createOperationController
);
