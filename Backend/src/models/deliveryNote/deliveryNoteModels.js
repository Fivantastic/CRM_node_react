import { getDBPool } from '../../db/getPool.js';
import crypto from 'crypto';
import { getPendingSales } from '../../utils/getPendingSales.js';

export const insertDeliveryNoteModel = async (
  sale_id,
  ref,
  deliverer_id,
  address_id,
  saleProduct_id
) => {
  const pool = getDBPool();

  // Verificamos si la venta está pendiente
  const pendingSales = await getPendingSales();
  const isSalePending = pendingSales.some(sale => sale.id_sale === sale_id);

  if (!isSalePending) {
    throw new Error('No se puede crear una nota de entrega para una venta no pendiente.');
  }

  // Si la venta está pendiente, procedemos con la inserción
  const id_note = crypto.randomUUID();

  const query = `
    INSERT INTO DeliveryNotes (id_note, ref_DN, sale_id, deliverer_id, address_id, saleProduct_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  await pool.execute(query, [
    id_note,
    ref,
    sale_id,
    deliverer_id,
    address_id,
    saleProduct_id,
  ]);

  return id_note;
};
