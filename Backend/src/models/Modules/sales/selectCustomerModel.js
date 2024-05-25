import { getDBPool } from '../../../db/getPool.js';
import { notFoundError } from '../../../services/error/errorService.js';

export const selectCustomerModel = async (customer) => {
  const pool = getDBPool();

  const [result] = await pool.query(
    `SELECT * FROM Customers WHERE id_customer = ? `,
    [customer]
  );
  if (!result || result.length === 0) {
    notFoundError('customer');
  }

  return result[0];
};
