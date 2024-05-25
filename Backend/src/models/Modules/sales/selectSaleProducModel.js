import { getDBPool } from '../../../db/getPool.js';
import { notFoundError } from '../../../services/error/errorService.js';

export const selectSaleProducModel = async (id_sale) => {
  const pool = getDBPool();

  const [result] = await pool.query(`SELECT * FROM Sales WHERE id_sale = ?`, [
    id_sale,
  ]);

  if (!result || result.length === 0) {
    notFoundError('Sale');
  }

  return result[0];
};
