import { getDBPool } from '../../db/getPool.js';

export const selectProductListModel = async () => {
  const pool = getDBPool();

  // Obtener todos los productos
  const result = await pool.query(`
    SELECT id_product, name, description, price, stock, product_status
    FROM Products
  `);

  return result[0];
};
