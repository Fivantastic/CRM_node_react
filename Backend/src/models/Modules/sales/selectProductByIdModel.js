import { getDBPool } from '../../../db/getPool.js';

export const selectProductByIdModel = async (id_saleProduct) => {
  const pool = await getDBPool();
  const [rows] = await pool.query(
    'SELECT * FROM SalesProducts WHERE id_saleProduct = ?',
    [id_saleProduct]
  );
  return rows[0];
};
