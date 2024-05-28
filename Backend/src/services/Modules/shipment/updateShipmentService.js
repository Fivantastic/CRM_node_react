import { updateShipmentModel } from '../../../models/Modules/shipment/updateShipmentModel.js';
import { selectShipmentDataModel } from '../../../models/Modules/shipment/selectShipmentDataModel.js';

export const updateShipmentService = async (shipmentId, body) => {
  const { shipment_status } = body;

  // Actualizar el envío en la base de datos.
  await updateShipmentModel(shipmentId, shipment_status );

  // Obtener el envío actualizado.
  const shipment = await selectShipmentDataModel(shipmentId);

  // Devolver el envío actualizado.
  return shipment;
};
