import { getDBPool } from "../../../db/getPool.js";

export const selectSalesListStatusModel = async () => {
    const pool = getDBPool();

    const rows = await pool.query(`SELECT * FROM Sales`);
    return rows[0];
}