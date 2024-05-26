import { getDBPool } from '../../db/getPool.js';

export const updateProductModel = async (
  id_product,
  name,
  description,
  price,
  stock
) => {
  const pool = await getDBPool();

  const fieldsToUpdate = [];
  const values = [];

  const addToUpdate = (field, value) => {
    if (value !== undefined && value !== null) {
      fieldsToUpdate.push(`${field} = ?`);
      values.push(value);
    }
  };

  addToUpdate(`name`, name);
  addToUpdate(`description`, description);
  addToUpdate(`price`, price);
  addToUpdate(`stock`, stock);

  if (fieldsToUpdate.length === 0) return {};

  const query = `UPDATE Products SET ${fieldsToUpdate.join(', ')} WHERE id_product = ?`;
  values.push(id_product);

  const [result] = await pool.query(query, values);

  // Si no se ha actualizado ningún producto, lanzar un error.
  if(result.affectedRows === 0) {
    const error = new Error('No se ha podido actualizar el producto');
    error.httpStatus = 500;
    error.code = 'UPDATE_PRODUCT_ERROR';
    throw error;
  }

  // Devolver el resultado.
  return result;
};
