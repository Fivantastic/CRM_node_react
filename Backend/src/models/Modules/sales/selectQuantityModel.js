import { getDBPool } from '../../../db/getPool.js';
import { notFoundError } from '../../../services/error/errorService.js';

export const selectQuantityModel = async (quantity, id_product) => {
  const pool = getDBPool();

  const [result] = await pool.query(
    `SELECT * FROM SalesProducts WHERE quantity = ? AND product_id = ?`,
    [quantity, id_product]
  );

  if (!result || result.length === 0) {
    notFoundError('SalesProducts');
  }

  return result[0];
};
