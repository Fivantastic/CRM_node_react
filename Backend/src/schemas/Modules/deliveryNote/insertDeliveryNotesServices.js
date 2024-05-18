// services/deliveryNoteService.js
import { insertDeliveryNoteModel } from '../../../models/deliveryNote/deliveryNoteModels.js';
import { getPendingSales } from '../../../utils/getPendingSales.js';
import crypto from 'crypto';

export const createDeliveryNoteService = async (deliveryNoteData) => {
  const { sale_id, deliverer_id, address_id, saleProduct_id } = deliveryNoteData;

  // Verificamos si la venta está pendiente
  const pendingSales = await getPendingSales();
  const isSalePending = pendingSales.some(sale => sale.id_sale === sale_id);

  if (!isSalePending) {
    throw new Error('No se puede crear una nota de entrega para una venta que no está pendiente.');
  }

  // Generar ref para la nota de entrega
  const ref_DN = `DN-${crypto.randomBytes(5).toString('hex').toUpperCase()}`;

  // Insertar la nota de entrega
  await insertDeliveryNoteModel(sale_id, ref_DN, deliverer_id, address_id, saleProduct_id);

  return 'Albarán creado con éxito';
};
