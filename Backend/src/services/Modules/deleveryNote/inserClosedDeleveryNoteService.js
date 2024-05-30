import { inserClosedDeleveryNoteModel } from '../../../models/Modules/deliveryNote/inserClosedDeleveryNoteModel.js';
import { selectDeliveryNoteByIdModel } from '../../../models/Modules/shipment/selectDeliveryNoteByIdModel.js';
import { notFoundError, errorNoteAndShipmentNotCancelled } from '../../error/errorService.js';

export const inserClosedDeleveryNoteService = async (deliveryNote_id, body) => {
  const { delivery_status } = body;

  // Compruebo que existe
  const existDelivery = await selectDeliveryNoteByIdModel(deliveryNote_id);
  if (!existDelivery) {
    notFoundError('Delivery_Note');
  }

  // Inserta el nuevo estado en la base de datos
  const response = await inserClosedDeleveryNoteModel(deliveryNote_id, delivery_status);

  return response;
};
