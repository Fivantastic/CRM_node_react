import { getDBPool } from '../../../db/getPool.js';
import { notFoundError } from '../../../services/error/errorService.js';

export const selectProductModel = async (product_id) => {
  const pool = getDBPool();

  const [result] = await pool.query(
    `SELECT * FROM Products WHERE id_product = ?`,
    [product_id]
  );

  if (!result || result.length === 0) {
    notFoundError('Products');
  }

  return result[0];
};
