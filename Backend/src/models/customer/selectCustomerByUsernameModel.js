import { getDBPool } from '../../db/getPool.js';

export const selectCustomerByUsernameModel = async (name) => {
  const pool = await getDBPool();

  // Obtener el cliente con ese nombre.
  const [customer] = await pool.query(
    `SELECT * FROM Customers WHERE name = ?`,
    [name]
  );

  return customer[0];
};
