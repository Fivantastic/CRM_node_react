import { getDBPool } from '../../db/getPool.js';

export const updateCustomerModel = async (
  customerId,
  name,
  email,
  phone,
  company_name,
  NIF
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

  addToUpdate('name', name);
  addToUpdate('email', email);
  addToUpdate('phone', phone);
  addToUpdate('company_name', company_name);
  addToUpdate('NIF', NIF);

  if (fieldsToUpdate.length === 0) return {};

  const query = `UPDATE Customers SET ${fieldsToUpdate.join(', ')} WHERE id_customer = ?`;
  values.push(customerId);

  const [result] = await pool.query(query, values);

  // Si no se ha actualizado ningún cliente, lanzar un error.
  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido actualizar el cliente');
    error.httpStatus = 500;
    error.code = 'UPDATE_CUSTOMER_ERROR';
    throw error;
  }

  // Devolver el resultado.
  return { message: 'Cliente actualizado correctamente' };
};
