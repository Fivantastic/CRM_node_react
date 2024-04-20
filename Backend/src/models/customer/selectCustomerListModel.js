import { getDBPool } from '../../db/getPool.js';

export const selectCustomersListModel = async () => {
  const pool = getDBPool();

  // Obtener todos los clientes
  const result = await pool.query(`SELECT * FROM Customers `);

  return result[0];
};
