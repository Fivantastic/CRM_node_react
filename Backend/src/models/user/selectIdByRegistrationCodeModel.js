import { getDBPool } from "../../db/getPool.js";

export const selectIdByRegistrationCode = async (registration_code) => {
    try {
        const pool = await getDBPool();
        const [rows] = await pool.query(
            "SELECT id_user FROM Users WHERE registration_code = ?",
            [registration_code]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};
