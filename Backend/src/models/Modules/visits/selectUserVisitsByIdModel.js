import { getDBPool } from "../../../db/getPool.js";

export const selectUserVisitsByIdModel = async (userId) => {

    const pool = getDBPool();

    const [visits] = await pool.query(
        `SELECT * FROM Visits WHERE user_id = ?`,
        [userId]
    );

    return visits
}