import { deleteDeliveryNoteModel } from '../../../models/Modules/deliveryNote/deleteDeliveryNoteModel.js';
import { selectDeliveryNoteByIdModel } from '../../../models/Modules/shipment/selectDeliveryNoteByIdModel.js';
import { invalidCredentials } from '../../error/errorService.js';

export const selectDeliveryNoteService = async (id_note) => {

  // Compruebo que existe y está cancelado
  const deliveryNote = await selectDeliveryNoteByIdModel(id_note);

  // Verifica si el albarán existe
  if (!deliveryNote || deliveryNote.id_note !== id_note) {
    invalidCredentials('El albarán no existe');
  }

  // Verifica si el albarán está cancelado
  if (deliveryNote.delivery_status !== 'cancelled') {
    invalidCredentials('El albarán no está cancelado');
  }

  // Eliminar el albarán de la base de datos.
  const response = await deleteDeliveryNoteModel(id_note);

  return response;
};
