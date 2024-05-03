import { deleteDeliveryNoteModel } from '../../../models/Modules/deliveryNote/deleteDeliveryNoteModel.js';
import { selectDeliveryNoteByIdModel } from '../../../models/Modules/shipment/selectDeliveryNoteByIdModel.js';
import { invalidCredentials } from '../../error/errorService.js';

export const selectDeliveryNoteService = async (deliveryNote_id) => {
  // compruebo que existe y esta cancelado
  const deliveryNote = await selectDeliveryNoteByIdModel(deliveryNote_id);

  if (deliveryNote === undefined || deliveryNote.id_note !== deliveryNote_id) {
    invalidCredentials('El albaran no existe');
  }

  if (deliveryNote.delivery_status !== 'cancelled') {
    invalidCredentials('El albaran no esta cancelado');
  }

  // Eliminar el albaran de la base de datos.
  const response = await deleteDeliveryNoteModel(deliveryNote_id);

  return response;
};
