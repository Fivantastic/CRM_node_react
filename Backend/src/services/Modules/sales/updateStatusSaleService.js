import { getDBPool } from '../../../db/getPool.js';

export const updateStatusSaleService = async (id, newStatus) => {
  const pool = await getDBPool();

  const fieldsToUpdate = [];
  const values = [];

  const addToUpdate = (field, value) => {
    if (value !== undefined && value !== null) {
      fieldsToUpdate.push(`${field} = ?`);
      values.push(value);
    }
  };

  addToUpdate('id_sale', id);
  addToUpdate('operation_status', newStatus);

  if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar, salir

  const query = `UPDATE Sales SET ${fieldsToUpdate.join(', ')} WHERE id_sale = ?`;
  values.push(id);

  const [result] = await pool.query(query, values);

  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido actualizar la venta.');
    error.httpStatus = 500;
    error.code = 'UPDATE_SALE_ERROR';
    throw error;
  }
  return { message: 'Status de venta Actualizada correctamente' };
};
