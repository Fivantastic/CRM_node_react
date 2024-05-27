import { getDBPool } from '../../../db/getPool.js';

export const selectDeliveryNoteByIdModel = async (deliveryNote_id) => {
  const pool = await getDBPool();

  const [rows] = await pool.query(
    'SELECT * FROM DeliveryNotes WHERE id_note = ?',
    [deliveryNote_id]
  );
  return rows[0];
}