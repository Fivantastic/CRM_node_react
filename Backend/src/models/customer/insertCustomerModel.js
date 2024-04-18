import { getDBPool } from '../../db/getPool.js';

// Función que realiza una consulta a la base de datos para crear un nuevo usuario.
export const insertCustomerModel = async (
  id_cliente,
  nombre,
  email,
  telefono
) => {
  // Crear un pool de conexiones.
  const pool = await getDBPool();

  // Insertamos el cliente en la base de datos.
  const [result] = await pool.query(
    `INSERT INTO Clientes (id_cliente, nombre, email, telefono) VALUES (?, ?, ?, ?)`,
    [id_cliente, nombre, email, telefono]
  );

  // Verificar si el insert afectó a alguna línea.
  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido insertar el cliente.');
    error.code = 'INSERT_CUSTOMER_ERROR';
    throw error;
  }
};
