import { selectShipmentByIdModel } from '../models/Modules/shipment/selectShipmentByIdModel.js';
import { notFoundError } from '../services/error/errorService.js';

export const shipmentExist = async (req, res, next) => {
  try {
    // Obtener el id del envio de la URL.
    const shipmentId = req.user?.shipmentId || req.params.shipmentId;

    // Comprobar si existe un envio con el id proporcionado.
    const shipment = await selectShipmentByIdModel(shipmentId);

    // Si no se encuentra el envio, lanzar un error.
    if (!shipment) {
      notFoundError('Shipment');
    }

    // Pasar el control al siguiente middleware.
    next();
  } catch (error) {
    next(error);
  }
};
