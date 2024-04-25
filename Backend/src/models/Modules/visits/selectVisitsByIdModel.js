import { getDBPool } from '../../db/getPool.js';

export const selecVisitsByIdModel = async (visitId) => {
    const pool = await getDBPool();
    const [rows] = await pool.query('SELECT * FROM visits WHERE id = ?', [visitId]);
    return rows[0];
}