import { updateShipmentModel } from '../../../models/Modules/shipment/updateShipmentModel.js';
import { selectShipmentByIdModel } from '../../../models/Modules/shipment/selectShipmentByIdModel.js';

export const updateShipmentService = async (shipmentId, body) => {
  const { shipment_status } = body;

  // Actualizar el envío en la base de datos.
  await updateShipmentModel(shipmentId, { shipment_status });

  // Obtener el envío actualizado.
  const shipment = await selectShipmentByIdModel(shipmentId);

  // Devolver el envío actualizado.
  return shipment;
};
