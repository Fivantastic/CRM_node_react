import { selectServiceByIdModel } from '../models/operationServices/selectServiceByModel.js';
import { notFoundError } from '../services/errorService.js';

export const serviceExist = async (req, res, next) => {
  try {
    // Obtener el id del servicio de la URL.
    const serviceId = req.params.serviceId;

    // Comprobar si existe un servicio con el id proporcionado.
    const customer = await selectServiceByIdModel(serviceId);

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
