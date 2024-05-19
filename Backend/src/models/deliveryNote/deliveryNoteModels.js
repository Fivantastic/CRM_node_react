import { getDBPool } from '../../db/getPool.js';

export const insertDeliveryNoteModel = async (
  sale_id,
  ref_DN,
  deliverer_id,
  address_id,
  customer_id,
  saleProduct_id
) => {
  const pool = getDBPool();

  const id_note = crypto.randomUUID();

  const query = `
    INSERT INTO DeliveryNotes (id_note, ref_DN, sale_id, deliverer_id, address_id, customer_id, saleProduct_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await pool.query (query, [
    id_note,
    ref_DN,
    sale_id,
    deliverer_id,
    address_id,
    customer_id,
    saleProduct_id
  ]);

  return id_note;
};
