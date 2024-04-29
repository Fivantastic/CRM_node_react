import { getDBPool } from "../../../db/getPool.js";

export const insertPaymentModel = async (idInvoice, userId, sale_id, payment_method, due_date) => {
    const pool = getDBPool();

    const fieldsToUpdate = [];
    const values = [];

    const addToUpdate = (field, value) => {
        if (value !== undefined && value !== null) {
            fieldsToUpdate.push(`${field} = ?`);
            values.push(value);
        }

    };

    addToUpdate('invoice_id', invoice_id);
    addToUpdate('amount', amount);
    addToUpdate('payment_status', payment_status);
    addToUpdate('payment_date', payment_date);

    if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar


    const query = `INSERT INTO Payments (invoice_id, amount, payment_status, payment_date) VALUES (?, ?, ?, ?)`;
    values.push(idInvoice);

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
        const error = new Error('No se ha podido insertar el pago');
        error.code = 'INSERT_PAYMENT_ERROR';
        throw error;
    }

    return {message: 'Pago creado correctamente'};
}