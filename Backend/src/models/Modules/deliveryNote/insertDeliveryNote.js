import { getDBPool } from '../../../db/getPool.js';

// Insertar albarán con ID aleatorio
export const insertDeliveryNote = async (
  sale_id,
  deliverer_id,
  delivery_status,
  address_id,
  saleProduct_id
) => {
  const pool = getDBPool();

  const id_note = crypto.randomUUID(); 

  const query = `
    INSERT INTO DeliveryNotes (id_note, sale_id, deliverer_id, delivery_status, address_id, saleProduct_id, created_at)
    VALUES (?, ?, ?, ?, ?, ?, NOW())
  `;

  await pool.execute(query, [
    id_note,
    sale_id,
    deliverer_id,
    delivery_status,
    address_id,
    saleProduct_id,
  ]);

  return id_note; // Devuelve el ID único generado
};
