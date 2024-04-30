import { getDBPool } from "../../../db/getPool.js";

export const selectInvoiceIdBySaleIdModel = async (saleId) => {
    const pool = await getDBPool();
    const sql = `SELECT id_invoice FROM Invoices WHERE sale_id = ?`;
    const [rows] = await pool.query(sql, [saleId]);
    return rows[0];
}