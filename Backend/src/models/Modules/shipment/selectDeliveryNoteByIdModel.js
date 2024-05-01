import { getDBPool } from '../../../db/getPool.js';

export const selectDeliveryNoteByIdModel = async (deliveryNote_id) => {
  const pool = await getDBPool();

  // Comprobar si existe un cliente con el id proporcionado.
  const [deliveryNote] = await pool.query(
    `SELECT * FROM DeliveryNotes WHERE  id_note = ?`,
    [deliveryNote_id]
  );

  return deliveryNote[0];

