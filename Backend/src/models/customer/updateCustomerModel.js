import { getDBPool } from '../../db/getPool.js';

export const updateCustomerModel = async (customerId, name, email, phone) => {
  const pool = await getDBPool();

  // Crear la query.
  let query = `UPDATE Customers SET name = ?, email = ?`;

  // Crear el array de valores.
  let values = [name, email];

  // SI hay telefono, añadirla a la query.
  if (phone) {
    query += `, phone = ?`;
    values.push(phone);
  } else {
    query += `, phone = NULL`;
  }

  // Añadir el where.
  query += ` WHERE id_customer = ?`;

  // Actualizar el usuario con esa id con la información del body.
  const [result] = await pool.query(query, [...values, customerId]);

  // Si no se ha actualizado ningún cliente, lanzar un error.
  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido actualizar el cliente');
    error.httpStatus = 500;
    error.code = 'UPDATE_CUSTOMER_ERROR';
    throw error;
  }

  // Devolver el resultado.
  return result;
};
