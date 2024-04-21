import { getDBPool } from '../../db/getPool.js'; // Importa el pool de conexiones

export const updatePasswordModel = async (userId, hashedPassword) => {
  const pool = getDBPool(); // Obtener el pool de conexiones
  const query = `
    UPDATE users
    SET password = ?
    WHERE id_user = ?
  `;

  await pool.execute(query, [hashedPassword, userId]); // Ejecutar la consulta
};
