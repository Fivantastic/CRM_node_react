import { getDBPool } from '../../db/getPool.js';
import { randomUUID } from 'crypto'; // Para generar UUID

// Insertar albarán con ID aleatorio
export const insertDeliveryNote = async (sale_id, deliverer_id, delivery_status, address_id, product_id) => {
  const pool = getDBPool();

  const id_note = randomUUID(); // Generar un UUID como ID único

  const query = `
    INSERT INTO DeliveryNotes (id_note, sale_id, deliverer_id, delivery_status, address_id, product_id, created_at)
    VALUES (?, ?, ?, ?, ?, ?, NOW())
  `;

  await pool.execute(query, [id_note, sale_id, deliverer_id, delivery_status, address_id, product_id]);

  return id_note; // Devuelve el ID único generado
};
