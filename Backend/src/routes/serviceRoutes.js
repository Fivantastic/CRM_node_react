import express from 'express';
import { moduleExist } from '../middlewares/serviceExist.js';
import { getModuleController } from '../controllers/ModulesService/getServiceController.js';

// Creamos un router
export const moduleRouter = express.Router();

moduleRouter.get('/module/:moduleId', moduleExist, getModuleController);
