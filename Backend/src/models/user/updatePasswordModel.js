import { getDBPool } from '../../db/getPool.js'; // Importa el pool de conexiones

export const updatePasswordModel = async (id_user, hashedPassword) => {
  const pool = getDBPool(); // Obtener el pool de conexiones
  const query = `
    UPDATE Users
    SET password = ?
    WHERE id_user = ?
  `;

  await pool.execute(query, [hashedPassword, id_user]); // Ejecutar la consulta
};
