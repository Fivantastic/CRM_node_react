import { getDBPool } from '../../db/getPool.js';

export const selectCustomerByUsernameModel = async (nombre) => {
  const pool = await getDBPool();

  // Obtener el cliente con ese nombre.
  const [customer] = await pool.query(
    `SELECT * FROM Clientes WHERE nombre = ?`,
    [nombre]
  );

  return customer[0];
};
