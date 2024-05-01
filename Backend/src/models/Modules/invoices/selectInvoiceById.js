import { getDBPool } from '../../../db/getPool.js';

export const selectInvoiceById = async (invoiceId) => {
    const pool = await getDBPool();
    const [rows] = await pool.query('SELECT * FROM Invoices WHERE id_invoice = ?', [invoiceId]);
    return rows[0];
}