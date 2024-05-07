import { getDBPool } from '../../../db/getPool.js';

export const selectProductModel = async (product) => {
  const pool = getDBPool();

  const [result] = await pool.query(
    `SELECT * FROM Products WHERE name LIKE ?`,
    [`%${product}%`]
  );

  if (!result || result.length === 0) {
    notFoundError('SalesProducts');
  }

  return result[0];
};
