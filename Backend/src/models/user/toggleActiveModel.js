import { getDBPool } from '../../db/getPool.js';

export const toggleActiveModel = async (id_user, value) => {
    const dbPool = getDBPool();
    const query = `UPDATE Users SET active = ? WHERE id_user = ?`;
    const values = [value, id_user];
    const [rows] = await dbPool.query(query, values);
    return rows;
}