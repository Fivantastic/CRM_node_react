import { getDBPool } from '../../db/getPool.js';

export const selectCustomerByIdModel = async (id_customer) => {
  const pool = await getDBPool();

  console.log('id_customer:', id_customer);

  // Comprobar si existe un cliente con el id proporcionado.
  const [customer] = await pool.query(
    `SELECT * FROM Customers WHERE id_customer = ?`,
    [id_customer]
  );
  console.log('customer:', customer);

  return customer;
};
