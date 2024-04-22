import { getDBPool } from "../../db/getPool.js";

export const selectIdByRegistrationCode = async (new_registration_code) => {
    try {
        const pool = await getDBPool();

        const [user_id] = await pool.query(
            `SELECT id_user FROM Users WHERE registration_code = ?`,
            [new_registration_code]
          );

        if (user_id.length === 0) {
            return;
        }

        return user_id[0].id_user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
