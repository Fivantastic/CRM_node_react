import { getDBPool } from '../../db/getPool.js';

export const selectUserByPasswordModel = async (password) => {
  const pool = await getDBPool();

  // Obtener el usuario con ese id.
  const [user] = await pool.query(
    `SELECT * FROM Users WHERE password = ?`,
    [password]
  );

  return user[0];
};