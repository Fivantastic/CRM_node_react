import  { getDBPool } from '../../../db/getPool.js';

export const selectmoduleByIdVisitModel = async (id) => {
    const pool = await getDBPool();
    const [rows] = await pool.query(
        'SELECT * FROM Modules WHERE visit_id = ?',
        [id]
    );
    return rows[0];
}