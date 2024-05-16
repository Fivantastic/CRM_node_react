import { getDBPool } from '../../../db/getPool.js';

export const insertSaleProductModel = async (
  id_sale,
  ref,
  id_user,
  id_saleProduct,
  id_customer
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
  addToUpdate('ref_SL', ref);
  addToUpdate('user_id', id_user);
  addToUpdate('saleProduct_id', id_saleProduct);
  addToUpdate('customer_id', id_customer);

  if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar, salir

  const query = `INSERT INTO Sales (id_sale, ref_SL, user_id, saleProduct_id, customer_id) VALUES (?,?,?,?,?)`;
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
