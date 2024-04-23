import { getDBPool } from '../../db/getPool.js'; // Importa el pool de conexiones MySQL

// Inserta una nueva operación en la base de datos
export const insertOperation = async (user_id, product_id, service_id, customer_id, type, operation_status) => {
  const pool = getDBPool(); // Obtener el pool de conexiones
  
  const query = `
    INSERT INTO Operations (user_id, product_id, service_id, customer_id, type, operation_status, creation_at)
    VALUES (?, ?, ?, ?, ?, ?, NOW())
  `;

  const [result] = await pool.execute(query, [user_id, product_id, service_id, customer_id, type, operation_status]);

  return result.insertId; // Devuelve el ID de la operación insertada
};
