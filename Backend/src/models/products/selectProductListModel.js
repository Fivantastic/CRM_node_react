import { getDBPool } from '../../db/getPool.js';

export const selectProductListModel = async () => {
  const pool = getDBPool();

  // Obtener todos los productos
  const result = await pool.query(`
    SELECT id_product, ref_PR, name, description, price, stock, active, creation_at
    FROM Products
    ORDER BY ref_PR DESC
  `);

  return result[0];
};
