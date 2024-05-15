import { getDBPool } from "../../db/getPool.js";

export const selectUserSearchModel = async (search) => {
    const pool = getDBPool();

    const [rows] = await pool.query(
        "SELECT * FROM Users WHERE name LIKE? OR last_name LIKE?",
        [`%${search}%`, `%${search}%`]
    );

    return rows;
}
