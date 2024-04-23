import express from 'express';
import { moduleExist } from '../middlewares/serviceExist.js';
import { getModuleController } from '../controllers/ModulesService/getServiceController.js';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import { newVisitController } from '../controllers/ModulesService/Visits/newVisitController.js';

// Creamos un router
export const moduleRouter = express.Router();

//TODO: MODULOS
// Obtener lista de modulos
moduleRouter.get('/module/:moduleId', moduleExist, getModuleController);


//TODO: MODULO SALES ORDERS



//TODO: MODULO VISITS
// Crear una nueva visita
moduleRouter.post('/user/module/visit', authenticateUser, newVisitController);


//TODO: MODULO DELIVERY NOTE

