import { getDBPool } from "../../../db/getPool.js";

export const selectCustomerIdBySaleIdModel = async (saleId) => {
    const pool = getDBPool();
    const query = `SELECT * FROM Sales WHERE id_sale = ?`;
    const [sale] = await pool.query(query, [saleId]);
    return sale[0];
}