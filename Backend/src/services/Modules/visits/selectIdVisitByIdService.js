import { getDBPool } from '../../../db/getPool.js';

export const selectIdVisitByIdService = async (visitId) => {
  const pool = getDBPool();

  const [result] = await pool.query(`SELECT * FROM Visits WHERE id_visit = ?`, [
    visitId,
  ]);

  return result[0];
};
