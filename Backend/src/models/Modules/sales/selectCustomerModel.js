import { getDBPool } from '../../../db/getPool.js';

export const selectCustomerModel = async (customer) => {
  const pool = getDBPool();

  const [result] = await pool.query(
    `SELECT * FROM Customers WHERE Customers.name LIKE ? `,
    [`%${customer}%`]
  );
  if (!result || result.length === 0) {
    notFoundError('SalesProducts');
  }

  return result[0];
};
