import { deleteShipmentService } from '../../../services/Modules/shipment/deleteShipmentService.js';
import { success } from '../../../utils/success.js';

export const deleteShipmentController = async (req, res, next) => {
  try {
    // Obtener el id del envío de la URL.
    const shipmentId = req.params.shipmentId;

    // Eliminar el envío y las referencias en la base de datos.
    await deleteShipmentService(shipmentId);

    // Respondemos al cliente.
    res.status(200).send(success({ message: 'Envio eliminado correctamente' }));
  } catch (error) {
    next(error);
  }
};
