import { getDBPool } from '../../../db/getPool.js';

export const updateVisitStatusModel = async (visitId, newStatus) => {
  const pool = await getDBPool();

  await pool.query(
    `UPDATE Visits SET visit_status = ?, update_at = NOW() WHERE id_visit = ?`,
    [newStatus, visitId]
  );
};
