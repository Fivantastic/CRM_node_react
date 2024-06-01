import { getDBPool } from '../../db/getPool.js';

export const insertUserModel = async (
  id_user, 
  ref,
  name, 
  last_name, 
  email, 
  password, 
  role,
  registration_code
) => {
  try {
    const pool = await getDBPool();

    // Insertamos el user en la base de datos.
    const [result] = await pool.query(
      `INSERT INTO Users (id_user, ref_US, name, last_name, email, password, role, registration_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id_user, ref, name, last_name, email, password, role, registration_code]
    );

    // Verificar si el insert afectó a alguna línea.
    if (result.affectedRows === 0) {
      const error = new Error('No se ha podido insertar el user.');
      error.code = 'INSERT_USER_ERROR';
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    console.error('Error en el modelo al insertar usuario:', error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    throw error;
  }
};