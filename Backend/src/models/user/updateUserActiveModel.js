import { getDBPool } from '../../db/getPool.js';

export const updateUserActiveModel = async (registration_code) => {
    const dbPool = getDBPool();
    const query = `UPDATE users SET active = true WHERE registration_code = ?`;
    const values = [registration_code];
    const [rows] = await dbPool.query(query, values);
    return rows;
}