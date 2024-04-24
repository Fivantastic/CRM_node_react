import { getDBPool } from '../../db/getPool.js';

export const selectUserByIdModel = async (id_user) => {
  const pool = await getDBPool();

  // Obtener el usuario con ese id.
  const [user] = await pool.query(
    `SELECT * FROM Users WHERE id_user = ?`,
    [id_user]
  );

  return user[0];
};