import { getDBPool } from '../../db/getPool.js';

export const controlStockProductService = async (productId) => {
  const pool = await getDBPool();

  const [result] = await pool.query(
    `SELECT name, stock  FROM Products
          WHERE id_product = ?;
          `,
    [productId]
  );

  return result[0];
};
