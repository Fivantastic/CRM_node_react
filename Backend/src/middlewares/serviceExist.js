import { selectModuleByIdModel } from '../models/Modules/selectModuleByModel.js';
import { notFoundError } from '../services/error/errorService.js';

export const moduleExist = async (req, res, next) => {
  try {
    // Obtener el id del servicio de la URL.
    const moduleId = req.params.moduleId;

    // Comprobar si existe un servicio con el id proporcionado.
    const module = await selectModuleByIdModel(moduleId);

    // Si no se encuentra el servicio, lanzar un error.
    if (!module) {
      notFoundError('modulo');
    }

    // Pasar el control al siguiente middleware.
    next();
  } catch (error) {
    next(error);
  }
};
