import { getDBPool } from '../../db/getPool.js';

export const updateUserActiveModel = async (id_user) => {
    const dbPool = getDBPool();
    const query = `UPDATE Users SET active = true WHERE id_user = ?`;
    const values = [id_user];
    const [rows] = await dbPool.query(query, values);
    return rows;
}