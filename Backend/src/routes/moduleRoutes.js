import express from 'express';
import { moduleExist } from '../middlewares/serviceExist.js';
import { getModuleController } from '../controllers/Modules/getServiceController.js';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import { newVisitController } from '../controllers/Modules/Visits/newVisitController.js';
import { adminAuthMiddleware } from '../middlewares/adminAuthMiddleware.js';
import { updateVisitController } from '../controllers/Modules/Visits/updateVisitController.js';
import { deleteVisitController } from '../controllers/Modules/Visits/deleteVisitController.js';
import { getUserVisitsController } from '../controllers/Modules/Visits/getUserVisitsController.js';
import { searchModulesController } from '../controllers/Modules/searchModulesController.js';
import { closeVisitController } from '../controllers/Modules/Visits/closeVisitController.js';
import { feedbackVisitController } from '../controllers/Modules/Visits/feedbackVisitController.js';


// Creamos un router
export const moduleRouter = express.Router();

//TODO: MODULOS
// Obtener lista de modulos
moduleRouter.get('/module/search', authenticateUser, searchModulesController);
moduleRouter.get('/module/:moduleId', moduleExist, getModuleController);

//TODO: MODULO SALES ORDERS

//TODO: MODULO VISITS
// Crear una nueva visita
moduleRouter.post('/user/module/visit', authenticateUser, newVisitController);

// Listar todas las visitas usuario administrador
// moduleRouter.get('/user/admin/module/visits', authenticateUser, adminAuthMiddleware,  getAdminVisitsController);

// Listar todas las visitas usuario normal
moduleRouter.get(
  '/user/module/visits/list',
  authenticateUser,
  getUserVisitsController
);

// Modificar una visita
moduleRouter.put(
  '/user/module/visit/:visitId',
  authenticateUser,
  updateVisitController
);

// Borrar una visita

moduleRouter.delete('/user/module/delete/visit/:visitId', authenticateUser, adminAuthMiddleware, deleteVisitController);

// Completar una visita y enviar valoacion al cliente
moduleRouter.put('/user/module/visit/complete/:visitId', authenticateUser, closeVisitController);

// Recivir e insertar la valoracion del cliente
moduleRouter.put('/user/module/visit/feedback/:visitId', feedbackVisitController);


//TODO: MODULO DELIVERY NOTE
