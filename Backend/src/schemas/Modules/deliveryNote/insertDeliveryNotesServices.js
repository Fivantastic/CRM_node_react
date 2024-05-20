import { insertDeliveryNoteModel } from '../../../models/deliveryNote/deliveryNoteModels.js';
import { getPendingSales } from '../../../utils/getPendingSales.js';
import { generateReference5DigitsFromRef } from '../../../utils/generateReference5Digits.js';
import { getMaxReference5Digits } from '../../../models/getMaxReference.js';

export const createDeliveryNoteService = async (deliveryNoteData) => {
  const { ref_SL, deliverer_id } = deliveryNoteData;

  // Verificamos si la venta está pendiente
  const pendingSales = await getPendingSales();
  const selectedSale = pendingSales.find(sale => sale.ref_SL === ref_SL);

  if (!selectedSale) {
    throw new Error('No se puede crear una nota de entrega para una venta que no está pendiente.');
  }

  const { id_sale, id_customer, address_id, id_saleProduct } = selectedSale;

  // Obtener la última referencia de DeliveryNotes
  let currentRefDeliveryNote = await getMaxReference5Digits('DeliveryNotes', 'ref_DN') || 'DN-AA00000';
  // Generar la nueva referencia
  const ref_DN = generateReference5DigitsFromRef('DN', currentRefDeliveryNote);

  // Insertar la nota de entrega
  const data = await insertDeliveryNoteModel(id_sale, ref_DN, deliverer_id, address_id, id_customer, id_saleProduct);

  return data;
};
