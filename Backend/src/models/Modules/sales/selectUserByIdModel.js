import { getDBPool } from '../../../db/getPool.js';

export const selectUserByIdModel = async (user_id) => {
  const pool = await getDBPool();

  // Comprobar si existe un producto con el id proporcionado.
  const [user] = await pool.query(`SELECT * FROM Users WHERE id_user = ?`, [
    user_id,
  ]);

  console.log('selecciona el usuario', user);
  return user[0];
};
