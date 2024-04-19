import { getDBPool } from '../../db/getPool.js';

export const selectUserByIdModel = async (id) => {
  const pool = await getDBPool();

  // Obtener el usuario con ese id.
  const [customer] = await pool.query(
    `SELECT * FROM Usuarios WHERE id_usuario = ?`,
    [id]
  );

  return user[0];
};