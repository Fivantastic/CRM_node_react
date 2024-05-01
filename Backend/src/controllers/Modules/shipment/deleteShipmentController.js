import { deleteShipmentModel } from '../../../models/Modules/shipment/deleteShipmentModel.js';
import { success } from '../../../utils/success.js';

export const deleteShipmentController = async (req, res, next) => {
  try {
    // Obtener el id del cliente de la URL.
    const shipmentId = req.params.shipmentId;

    // Eliminar el cliente de la base de datos.
    const deleteShipment = await deleteShipmentModel(shipmentId);

    // Respondemos al cliente.
    res.status(200).send(success(deleteShipment));
  } catch (error) {
    next(error);
  }
};
