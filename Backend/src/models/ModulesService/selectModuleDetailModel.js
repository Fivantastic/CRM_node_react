import { getDBPool } from '../../db/getPool.js';

export const selectModuleDetailModel = async (moduleId) => {
  const pool = getDBPool();

  // Obtener el detalle del servicio
  const result = await pool.query(
    `SELECT * FROM Modules WHERE moduleId = ?`,
    [moduleId]
  );

  return result[0];
};
