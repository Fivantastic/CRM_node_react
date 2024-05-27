import { getDBPool } from "../../db/getPool.js";

export const selectIdByRegistrationCode = async (registration_code) => {
    try {
        const pool = await getDBPool();
        const [rows] = await pool.query(
            "SELECT id_user, registration_code FROM Users WHERE registration_code = ?",
            [registration_code]
        );
        /* console.log(`Resultados: ${JSON.stringify(rows)}`); */
        return rows[0];
    } catch (error) {
        console.error(`Error al consultar id_user: ${error.message}`);
        throw error;
    }
};
