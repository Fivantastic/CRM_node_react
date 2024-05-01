import { getDBPool } from '../../../db/getPool.js';

export const statusUpdateInvoiceModel = async (invoiceId, invoice_status) => {
    const pool = await getDBPool();
    const query = 'UPDATE Invoices SET invoice_status = ? WHERE id_invoice = ?';
    const params = [invoice_status, invoiceId];
    const result = await pool.query(query, params);
    if (result.affectedRows === 0) {
        const error = new Error('No se ha podido cerrar la factura');
        error.code = 'STATUS_INVOICE_ERROR';
        throw error;
    }

    return { message: 'Estadp de la factura actualizado correctamente' };
}