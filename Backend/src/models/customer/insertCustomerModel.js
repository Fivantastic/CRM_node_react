import { getDBPool } from "../../db/getPool.js";

// Función que realiza una consulta a la base de datos para crear un nuevo usuario.
export const insertCustomerModel = async (id_customer, name, email, phone, id_address) => {
  // Crear un pool de conexiones.
  const pool = await getDBPool();

  // Insertamos el cliente en la base de datos.
  const [result] = await pool.query(
    `INSERT INTO Customers (id_customer, name, email, phone, address_id) VALUES (?, ?, ?, ?, ?)`,
    [id_customer, name, email, phone, id_address]
  );

  // Verificar si el insert afectó a alguna línea.
  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido insertar el cliente.');
    error.code = 'INSERT_CUSTOMER_ERROR';
    throw error;
  }
};
