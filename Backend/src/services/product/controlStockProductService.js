import { getDBPool } from '../../db/getPool.js';

export const controlStockProductService = async (product_id) => {
  const pool = await getDBPool();

  const [result] = await pool.query( `SELECT name, stock  FROM Products WHERE id_product = ?`,
    [product_id]
  );

  return result[0];
};
