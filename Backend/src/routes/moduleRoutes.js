import express from 'express';
import { moduleExist } from '../middlewares/serviceExist.js';
import { getModuleController } from '../controllers/ModulesService/getServiceController.js';
// import { authenticateUser } from '../middlewares/authenticateUser.js';
// import { newVisitController } from '../controllers/ModulesService/Visits/newVisitController.js';
// import { adminAuthMiddleware } from '../middlewares/adminAuthMiddleware.js';
// import { getUserVisitsController } from '../controllers/ModulesService/Visits/getUserVisitsController.js';
// import { updateVisitController } from '../controllers/ModulesService/Visits/updateVisitController.js';

// Creamos un router
export const moduleRouter = express.Router();

//TODO: MODULOS
// Obtener lista de modulos
moduleRouter.get('/module/:moduleId', moduleExist, getModuleController);


//TODO: MODULO SALES ORDERS



//TODO: MODULO VISITS
// Crear una nueva visita
// moduleRouter.post('/user/module/visit', authenticateUser, newVisitController);

// Listar todas las visitas usuario administrador
// moduleRouter.get('/user/admin/module/visits', authenticateUser, adminAuthMiddleware,  getAdminVisitsController);

// Listar todas las visitas usuario normal
// moduleRouter.get('/user/module/visits', authenticateUser, getUserVisitsController);

// Modificar una visita
// moduleRouter.put('/user/module/visit/:visitId', authenticateUser, updateVisitController);

// // Borrar una visita
// moduleRouter.delete('/user/module/visit/:visitId', authenticateUser, deleteVisitController);


//TODO: MODULO DELIVERY NOTE

