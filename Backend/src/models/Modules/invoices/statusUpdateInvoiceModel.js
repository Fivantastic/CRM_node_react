import { getDBPool } from '../../../db/getPool.js';

export const statusUpdateInvoiceModel = async (invoiceId, invoice_status) => {
    const pool = await getDBPool();
    const result = await pool.query(
        'UPDATE Invoices SET invoice_status = ? WHERE id_invoice = ?',
        [invoice_status, invoiceId]
    );
    return result;
}