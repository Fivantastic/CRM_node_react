import { getDBPool } from '../../../db/getPool.js';

export const selectIdVisitByIdService = async (ref_VT) => {
  const pool = getDBPool();

  const [result] = await pool.query(`SELECT * FROM Visits WHERE id_visit = ?`, [
    ref_VT,
  ]);

  return result[0];
};
