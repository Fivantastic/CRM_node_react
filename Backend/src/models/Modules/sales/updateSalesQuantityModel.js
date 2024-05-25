import { getDBPool } from '../../../db/getPool.js';
import { controlStockProductService } from '../../../services/product/controlStockProductService.js';

export const updateSalesQuantityModel = async (
  product_id,
  quantity
) => {
  const pool = await getDBPool();
  
  // Actualizo el stock del producto
  const fieldsToUpdate = [];
  const values = [];

  const addToUpdate = (field, value) => {
    if (value !== undefined && value !== null) {
      fieldsToUpdate.push(`${field} = ?`);
      values.push(value);
    }
  };

  // Obtengo el stock de base de datos
    const stock = await controlStockProductService(product_id);

    // Convierto la info ha numeros
    const numberStock = Number(stock.stock);
    const number = Number(quantity);

    const namberModify = (storage, number) => {
      return storage - number;
  };

  // Le resto la cantidad vendida
  const update = namberModify(numberStock, number);

  addToUpdate(`id_product`, product_id);
  addToUpdate(`stock`, update);

  if (fieldsToUpdate.length === 0) return {};

  const query = `UPDATE Products SET ${fieldsToUpdate.join(', ')} WHERE id_product = ?`;
  values.push(product_id);

  const [result] = await pool.query(query, values);

  // Si no se ha insertado ningún producto, lanzar un error.
  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido actualizar el producto');
    error.httpStatus = 500;
    error.code = 'INSERT_PRODUCT_ERROR';
    throw error;
  }
  return { message: 'sale actualizado correctamente' };
};
