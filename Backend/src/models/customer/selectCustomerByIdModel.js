import { getDBPool } from '../../db/getPool.js';

export const selectCustomerByIdModel = async (id_customer) => {
  const pool = await getDBPool();

  // Comprobar si existe un cliente con el id proporcionado.
  const [rows] = await pool.query(
    `SELECT * FROM Customers WHERE id_customer = ?`,
    [id_customer]
  );

  return rows[0];
};
