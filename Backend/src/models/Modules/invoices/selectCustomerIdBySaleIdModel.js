import { getDBPool } from "../../../db/getPool.js";

export const selectCustomerIdBySaleIdModel = async (saleId) => {
    const pool = getDBPool();
    const query = `SELECT customer_id FROM Sales WHERE id_sale = ?`;
    const [result] = await pool.query(query, [saleId]);
    return result[0];
}