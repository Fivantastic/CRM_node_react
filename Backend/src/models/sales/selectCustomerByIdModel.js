import { getDBPool } from '../../db/getPool.js';

export const selectCustomerByIdModel = async (customer_id) => {
  const pool = await getDBPool();

  // Comprobar si existe un cliente con el id proporcionado.
  const customer = await pool.query(
    `SELECT * FROM Customers WHERE id_customer = ?`,
    [customer_id]
  );
  console.log('selecciona el cliente', customer);

  return customer[0];
};
