import express from 'express';
import { moduleExist } from '../middlewares/serviceExist.js';
import { getModuleController } from '../controllers/ModulesService/getServiceController.js';
import { authenticateUser } from '../middlewares/authenticateUser.js';
// import { newSaleOrderController } from '../controllers/ModulesService/salesOrder/newSaleOrderController.js';
import { newVisitController } from '../controllers/ModulesService/Visits/newVisitController.js';

// Creamos un router
export const moduleRouter = express.Router();

moduleRouter.get('/module/:moduleId', moduleExist, getModuleController);

// moduleRouter.post('/module/saleOrder', authenticateUser, newSaleOrderController);

moduleRouter.post('/user/module/visit', authenticateUser, newVisitController);
