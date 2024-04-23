import { selectModuleByIdModel } from '../models/ModulesService/selectModuleByModel.js';
import { notFoundError } from '../services/errorService.js';

export const moduleExist = async (req, res, next) => {
  try {
    // Obtener el id del servicio de la URL.
    const moduleId = req.params.moduleId;

    // Comprobar si existe un servicio con el id proporcionado.
    const customer = await selectModuleByIdModel(moduleId);

    // Si no se encuentra el servicio, lanzar un error.
    if (!customer) {
      notFoundError('service');
    }

    // Pasar el control al siguiente middleware.
    next();
  } catch (error) {
    next(error);
  }
};
