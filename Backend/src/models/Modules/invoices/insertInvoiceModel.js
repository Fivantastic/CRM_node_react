import { getDBPool } from "../../../db/getPool.js";

export const insertInvoiceModel = async (idInvoice, userId, sale_id, payment_method, due_date) => {
    const pool = getDBPool();

    const fieldsToUpdate = [];
    const values = [];

    const addToUpdate = (field, value) => {
        if (value !== undefined && value !== null) {
            fieldsToUpdate.push(`${field} = ?`);
            values.push(value);
        }

    };

    addToUpdate('idInvoice', idInvoice);
    addToUpdate('userId', userId);
    addToUpdate('sale_id', sale_id);
    addToUpdate('payment_method', payment_method);
    addToUpdate('due_date', due_date);

    if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar


    const query = `INSERT INTO Invoices (idInvoice, userId, sale_id, payment_method, due_date) VALUES (?, ?, ?, ?, ?)`;
    values.push(idInvoice);

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
        const error = new Error('No se ha podido insertar la factura');
        error.code = 'INSERT_INVOICE_ERROR';
        throw error;
    }

    return {message: 'Factura creada correctamente'};
}