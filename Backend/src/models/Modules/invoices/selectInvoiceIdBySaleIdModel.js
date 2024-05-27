import { getDBPool } from "../../../db/getPool.js";

export const selectInvoiceIdBySaleIdModel = async (saleId) => {
    const pool = await getDBPool();
    const query = `SELECT id_invoice FROM Invoices WHERE sale_id = ?`;
    const [rows] = await pool.query(query, [saleId]);
    return rows[0];
}