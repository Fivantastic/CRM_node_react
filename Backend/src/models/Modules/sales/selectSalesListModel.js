import { getDBPool } from '../../../db/getPool.js';

export const selectSalesListModel = async () => {
  const pool = getDBPool();

  // Obtener todas las ventas
  const result = await pool.query(`SELECT * FROM Sales `);

  return result[0];
};
