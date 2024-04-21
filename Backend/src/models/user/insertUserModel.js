import { getDBPool } from '../../db/getPool.js';

// Función que realiza una consulta a la base de datos para crear un nuevo usuario.
export const insertUserModel = async (
    id_user, 
    name, 
    last_name, 
    email, 
    password, 
    role, 
    registration_code
) => {
  // Crear un pool de conexiones.
  const pool = await getDBPool();

  // Insertamos el user en la base de datos.
  const [result] = await pool.query(
    `INSERT INTO Users (id_user, name, last_name, email, password, role, registration_code) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id_user, name, last_name, email, password, role, registration_code]
  );

  // Verificar si el insert afectó a alguna línea.
  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido insertar el user.');
    error.code = 'INSERT_USER_ERROR';
    throw error;
  }
};
