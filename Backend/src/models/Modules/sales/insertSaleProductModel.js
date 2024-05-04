import { getDBPool } from '../../../db/getPool.js';

export const insertSaleProductModel = async (
  id_sale,
  id_user,
  saleProdut_id,
  customer_id
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

  addToUpdate('id_sale,', id_sale);
  addToUpdate('user_id', id_user);
  addToUpdate('saleProduct_id', saleProdut_id);
  addToUpdate('customer_id', customer_id);

  if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar, salir

  const query = `INSERT INTO Sales (id_sale, user_id, saleProduct_id, customer_id) VALUES (?,?,?,?)`;
  values.push(id_sale);

  const [result] = await pool.query(query, values);

  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido insertar la venta.');
    error.httpStatus = 500;
    error.code = 'INSERT_SALE_ERROR';
    throw error;
  }
  return { message: 'Venta creada correctamente' };
};
