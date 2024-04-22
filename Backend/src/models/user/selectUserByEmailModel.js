import { getDBPool } from "../../db/getPool.js";


export const selectUserByEmailModel = async (email) => {
  const pool = await getDBPool();

  // Obtener el usuario con ese email.
  const [user] = await pool.query(
    `SELECT * FROM Users WHERE email = ?`,
    [email]
  );

  console.log('user:', user);

  return user[0];
};