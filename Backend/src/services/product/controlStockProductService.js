import { getDBPool } from '../../db/getPool.js';

export const controlStockProductService = async (id_product) => {
  const pool = await getDBPool();

  const [result] = await pool.query(
    `SELECT name, stock  FROM Products
          WHERE id_product = ?;
          `,
    [id_product]
  );

  return result[0];
};
