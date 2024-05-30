import { deleteShipmentModel } from '../../../models/Modules/shipment/deleteShipmentModel.js';
import { updateModulesByShipmentIdModel } from '../../../models/Modules/shipment/deleteModulesByShipmentIdModel.js';
import { errorDeleteShipmentNotCancelled, errorDeleteShipmentNotCancelledNote } from '../../error/errorService.js';
import { selectShipmentByIdShipmentModel } from '../../../models/Modules/shipment/selectShipmentByIdShipmentModel.js';
import { selectDeliveryNoteByIdShipmentModel } from '../../../models/Modules/shipment/selectDeliveryNoteByIdShipmentModel.js';

export const deleteShipmentService = async (shipmentId) => {
  // Obtener los datos de shipment y verificar si el envío esta cancelado
  const shipment = await selectShipmentByIdShipmentModel(shipmentId);

  if (shipment.shipment_status !== 'cancelled') {
    errorDeleteShipmentNotCancelled();
  }

  const deliveryNote = await selectDeliveryNoteByIdShipmentModel(shipment.deliveryNote_id);

  if (deliveryNote.delivery_status !== 'cancelled') {
    errorDeleteShipmentNotCancelledNote();
  }

  // Primero actualizar las filas correspondientes en la tabla Modules
  await updateModulesByShipmentIdModel(shipmentId);
  
  // Luego eliminar la fila en la tabla Shipments
  await deleteShipmentModel(shipmentId);
};
