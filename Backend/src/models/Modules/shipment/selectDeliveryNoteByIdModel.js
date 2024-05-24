import { getDBPool } from '../../../db/getPool.js';

export const selectDeliveryNoteByIdModel = async (deliveryNote_id) => {
  const pool = await getDBPool();

  // Seleccionar todos los campos necesarios del albarán.
  const [deliveryNote] = await pool.query(
    `SELECT id_note, delivery_status, customer_id, address_id FROM DeliveryNotes WHERE id_note = ?`,
    [deliveryNote_id]
  );

  return deliveryNote[0];
};
