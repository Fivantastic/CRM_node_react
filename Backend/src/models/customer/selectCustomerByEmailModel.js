import { getDBPool } from '../../db/getPool.js';

export const selectCustomerByEmailModel = async (email) => {
  const pool = await getDBPool();

  // Obtener el cliente  con ese email.
  const [customer] = await pool.query(
    `SELECT * FROM Customers WHERE email = ?`,
    [email]
  );

  return customer[0];
};
