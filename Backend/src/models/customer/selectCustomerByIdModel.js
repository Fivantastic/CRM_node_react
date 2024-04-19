import { getDBPool } from '../../db/getPool.js';

export const selectCustomerByIdModel = async (customerId) => {
  const pool = await getDBPool();

  // Comprobar si existe un cliente con el id proporcionado.
  const [customer] = await pool.query(
    `SELECT * FROM Customers WHERE id_customer = ?`,
    [customerId]
  );

  return customer[0];
};
