import { getDBPool } from '../../db/getPool.js';

export const insertDeliveryNoteModel = async (
  id_note,
  sale_id,
  ref_DN,
  deliverer_id,
  address_id,
  customer_id,
  saleProduct_id
) => {
  const pool = getDBPool();

  const insertQuery = `
    INSERT INTO DeliveryNotes (id_note, ref_DN, sale_id, deliverer_id, address_id, customer_id, saleProduct_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  await pool.query(insertQuery, [
    id_note,
    ref_DN,
    sale_id,
    deliverer_id,
    address_id,
    customer_id,
    saleProduct_id
  ]);

  const selectQuery = `
    SELECT * FROM DeliveryNotes WHERE id_note = ?
  `;

  const [rows] = await pool.query(selectQuery, [id_note]);
  return rows[0]; // Devolver el primer (y único) registro del resultado de la consulta
};
