import { getDBPool } from '../../../db/getPool.js';

export const selectRefVisitModel = async (visitId) => {
  const pool = await getDBPool();

  const [rows] = await pool.query(
    'SELECT ref_VT FROM Visits WHERE id_visit = ?',
    [visitId]
  );
  return rows[0];
};
