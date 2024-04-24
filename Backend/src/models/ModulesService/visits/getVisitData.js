import { getDBPool } from '../../../db/getPool.js';

export const getVisitData = async (visitId) => {
    const pool = await getDBPool();
    const [rows] = await pool.query('SELECT user_id, customer_id, visit_date, observations FROM Visits WHERE id_visit = ?', [visitId]);
    return rows[0];
}
