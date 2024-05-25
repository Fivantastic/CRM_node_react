import { getDBPool } from '../../../db/getPool.js';
import { updateSalesQuantityModel } from './updateSalesQuantityModel.js';

export const updateSaleProductModel = async (
  saleProduct_id,
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

  addToUpdate('id_saleProduct', saleProduct_id);
  addToUpdate('product_id', product_id);
  addToUpdate('quantity ', quantity);

  if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar, salir

    const query = `UPDATE SalesProducts SET ${fieldsToUpdate.join(', ')} WHERE id_saleProduct = ?`;
    values.push(saleProduct_id);   

    const [result] = await pool.query(query, values);

  // Obtengo el stock de base de datos
  if (quantity !== undefined) {
    const saleQuantity = await updateSalesQuantityModel(product_id, quantity);
    
    return saleQuantity;
  };
  
  // Si no se ha insertado ningún producto, lanzar un error.
  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido actualizar el producto');
    error.httpStatus = 500;
    error.code = 'INSERT_PRODUCT_ERROR';
    throw error;
  }
  /* return { message: 'sale actualizado correctamente' }; */
};
