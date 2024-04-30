import { response } from 'express';
import { getDBPool } from '../../../db/getPool.js';

export const deleteInvoiceModel = async (invoiceId) => {
    const pool = await getDBPool();
    const query = 'DELETE FROM Invoices WHERE id_invoice = ?';
    const params = [invoiceId];
    const result = await pool.query(query, params);

    if (result.affectedRows === 0) {
        const error = new Error('No se ha podido eliminar la factura');
        error.code = 'DELETE_INVOICE_ERROR';
        throw error;
    }
    
    return {message: 'Factura eliminada correctamente'};
}