import { getDBPool } from '../../db/getPool.js';

export const selectIdVisitMosuleByIdService = async (id_visit) => {
  const pool = getDBPool();

  const [result] = await pool.query(
    `SELECT * FROM Modules WHERE visit_id = ?`,
    [id_visit]
  );

  return result[0];
};
