import { getDBPool } from '../../db/getPool.js'; // Obtener el pool de conexiones

// Modelo para seleccionar usuario por correo electrónico
export const selectUserByEmailModel = async (email) => {
  const pool = getDBPool();
  const [rows] = await pool.execute(`
    SELECT * FROM Users WHERE email = ?
  `, [email]);

  return rows[0]; // Devolver el primer resultado (usuario)
};

// Modelo para actualizar usuario (por ejemplo, con el código de recuperación)
export const updateUserModel = async (userId, updates) => {
  const pool = getDBPool();
  const keys = Object.keys(updates);
  const values = Object.values(updates);

  const setClause = keys.map((key, index) => `${key} = ?`).join(', ');

  const query = `
    UPDATE Users
    SET ${setClause}
    WHERE id_user = ?
  `;

  await pool.execute(query, [...values, userId]);
};
