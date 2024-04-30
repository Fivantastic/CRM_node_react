import { closedUpdateShipmentModel } from '../../../models/Modules/shipment/closedUpdateShipmentModel.js';
import { selectShipmentByIdModel } from '../../../models/Modules/shipment/selectShipmentByIdModel.js';
import { shipmentAlreadyCompletedError } from '../../error/errorService.js';

export const closedShipmentService = async (shipmentId, body) => {
  const { shipment_status } = body;

  // Comprobar si el envio ya existe.
  const existShipment = await selectShipmentByIdModel(shipmentId);

  // Si existe, comprobar si es el mismo shipment_status.
  if (existShipment && existShipment.shipment_status === shipment_status) {
    shipmentAlreadyCompletedError();
  }

  // Actualizar el envio en la base de datos.
  await closedUpdateShipmentModel(shipmentId, shipment_status);

  // Obtener el envio actualizado.
  const shipment = await selectShipmentByIdModel(shipmentId);

  // Devolver el envio actualizado.
  return shipment;
};
