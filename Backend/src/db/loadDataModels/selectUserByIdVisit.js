import { getDBPool } from "../getPool.js";

export const selectUserByIdVisit = async (id_visit) => {
    try {
        const pool = getDBPool();
        const [rows] = await pool.query(
            "SELECT * FROM Visits WHERE id_visit = ?",
            [id_visit]
        );
        return rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}