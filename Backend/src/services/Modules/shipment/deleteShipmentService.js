import { deleteShipmentModel } from '../../../models/Modules/shipment/deleteShipmentModel.js';
import { deleteModulesByShipmentIdModel } from '../../../models/Modules/shipment/deleteModulesByShipmentIdModel.js';

export const deleteShipmentService = async (shipmentId) => {
  // Primero eliminar las filas correspondientes en la tabla Modules
  await deleteModulesByShipmentIdModel(shipmentId);
  
  // Luego eliminar la fila en la tabla Shipments
  await deleteShipmentModel(shipmentId);
};
