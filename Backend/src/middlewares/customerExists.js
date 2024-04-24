import { selectCustomerByIdModel } from '../models/customer/selectCustomerByIdModel.js';
import { notFoundError } from '../services/error/errorService.js';

export const customerExists = async (req, res, next) => {
  try {
    // Obtener el id del cliente de la URL.
    const customerId = req.user?.id || req.params.customerId;

    // Comprobar si existe un cliente con el id proporcionado.
    const customer = await selectCustomerByIdModel(customerId);

    // Si no se encuentra el cliente, lanzar un error.
    if (!customer) {
      notFoundError('customer');
    }

    // Pasar el control al siguiente middleware.
    next();
  } catch (error) {
    next(error);
  }
};
