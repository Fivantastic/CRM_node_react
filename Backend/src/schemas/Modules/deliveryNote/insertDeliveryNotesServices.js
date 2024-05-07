import { insertDeliveryNoteModel } from '../../../models/deliveryNote/deliveryNoteModels.js';

export const createDeliveryNoteService = async (deliveryNoteData) => {
  const { sale_id, deliverer_id,  customer_id, address_id, saleProduct_id } =
    deliveryNoteData;

  try {
    await insertDeliveryNoteModel(
      sale_id,
      deliverer_id,
      customer_id,
      address_id,
      saleProduct_id
    );
  } catch (error) {
    error.statusCode = 500;
    error.code = 'Error al insertar el albarán';
    throw error;
  }
};
