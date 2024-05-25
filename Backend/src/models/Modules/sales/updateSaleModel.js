import { getDBPool } from '../../../db/getPool.js';

export const updateSaleModel = async (id_sale, saleProduct_id, customer) => {
  const pool = await getDBPool();

  const fieldsToUpdate = [];
  const values = [];

  const addToUpdate = (field, value) => {
    if (value !== undefined && value !== null) {
      fieldsToUpdate.push(`${field} = ?`);
      values.push(value);
    }
  };

  addToUpdate('id_sale', id_sale);
  addToUpdate('saleProduct_id', saleProduct_id);
  addToUpdate('customer_id', customer);

  if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar, salir

  const query = `UPDATE Sales SET ${fieldsToUpdate.join(', ')} WHERE id_sale = ?`;
  values.push(id_sale);

  const [result] = await pool.query(query, values);

  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido actualizar la venta.');
    error.httpStatus = 500;
    error.code = 'UPDATE_SALE_ERROR';
    throw error;
  }
};
