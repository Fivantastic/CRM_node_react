import { getDBPool } from '../../db/getPool.js';

export const updateUserModel = async (
  userId,
  name,
  last_name,
  email,
  phone,
  bio
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
  addToUpdate('last_name', last_name);
  addToUpdate('email', email);
  addToUpdate('phone', phone);
  addToUpdate('biography', bio);

  if (fieldsToUpdate.length === 0) return {};

  //insetamos en la base de datos
  const query = `UPDATE Users SET ${fieldsToUpdate.join(', ')} WHERE id_user = ?`;
  values.push(userId);

  const [result] = await pool.query(query, values);

  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido actualizar el usuario.');
    error.httpStatus = 500;
    error.code = 'UPDATE_USER_ERROR';
    throw error;
  }

  return result;
};
