import { insertDeliveryNoteModel } from '../../../models/deliveryNote/deliveryNoteModels.js';
import { getMaxReference5Digits } from '../../../models/getMaxReference.js';
import { generateReference5DigitsFromRef } from '../../../utils/generateReference5Digits.js';

export const createDeliveryNoteService = async (deliveryNoteData) => {
  // Obtenemos los datos
  const { sale_id, deliverer_id,  customer_id, address_id, saleProduct_id } =
  deliveryNoteData;

  // Obtenemos la referencia máxima de la tabla DeliveryNote
  const maxRef = await getMaxReference5Digits('DeliveryNotes', 'ref_DN');

  // Generamos la nueva referencia de DeliveryNote
  const ref = generateReference5DigitsFromRef('DN', maxRef);

  await insertDeliveryNoteModel(
  sale_id,
  ref,
  deliverer_id,
  customer_id,
  address_id,
  saleProduct_id
  );
};
