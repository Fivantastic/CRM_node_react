import { getDBPool } from '../../db/getPool.js';

// Define la función para seleccionar notas de entrega
export const selectDeliveryNotesModel = async () => {
  const pool = getDBPool();

  try {
    // Realiza la consulta a la base de datos para obtener las notas de entrega
    const result = await pool.query(`
      SELECT * FROM DeliveryNotes
    `);

    // Devuelve el resultado de la consulta
    return result[0];
  } catch (error) {
    // Manejo de errores
    throw error;
  }
};
