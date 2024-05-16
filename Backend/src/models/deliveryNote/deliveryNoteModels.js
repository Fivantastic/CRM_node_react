import { getDBPool } from '../../db/getPool.js';
import crypto from 'crypto';

export const insertDeliveryNoteModel = async (
  sale_id,
  ref,
  deliverer_id,
  address_id,
  saleProduct_id
) => {
  const pool = getDBPool();

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
