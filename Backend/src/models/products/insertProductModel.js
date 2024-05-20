import { getDBPool } from '../../db/getPool.js';

export const insertProductModel = async (
  id_product,
  ref_PR,
  name,
  description,
  price,
  stock,
  product_status
) => {
  const pool = await getDBPool();
  const [result] = await pool.query(
    'INSERT INTO Products (id_product, ref_PR, name, description, price, stock, product_status) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id_product, ref_PR, name, description, price, stock, product_status]
  );
  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido insertar el producto.');
    error.code = 'INSERT_PRODUCTS_ERROR';
    throw error;
  }
};
