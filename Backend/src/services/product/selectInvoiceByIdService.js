import { getDBPool } from "../../db/getPool.js";

export const selectInvoiceByIdService = async (id_invoice) => {
    const pool = await getDBPool();
    const sql = `SELECT * FROM Invoices WHERE id_invoice = ?`;
    const [rows] = await pool.query(sql, [id_invoice]);
    return rows[0];
}