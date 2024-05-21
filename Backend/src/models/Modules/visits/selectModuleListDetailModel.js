import { getDBPool } from '../../../db/getPool.js';

export const selectModuleListDetailModel = async () => {
  const pool = getDBPool();

  // Obtener el detalle del los modulos
  const result = await pool.query(`SELECT * FROM Modules`);

  return result[0];
};
