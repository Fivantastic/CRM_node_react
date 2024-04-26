import express from 'express';
import { authenticateUser } from '../../middlewares/authenticateUser.js';
import { moduleExist } from '../../middlewares/serviceExist.js';
import { 
    getModuleController, 
    searchModulesController 
} from '../../controllers/modulesControllers.js';


// Creamos un router
export const moduleRouter = express.Router();

// Obtener lista de modulos
moduleRouter.get('/module/search', authenticateUser, searchModulesController);

// Obtener un modulo
moduleRouter.get('/module/:moduleId', moduleExist, getModuleController);


