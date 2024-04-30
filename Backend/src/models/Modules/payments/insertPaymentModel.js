import { getDBPool } from "../../../db/getPool.js";
                                        // idPayment, invoice_id, amount, payment_date
export const insertPaymentModel = async (id_payment, invoice_id, amount, payment_date)=> {
    const pool = getDBPool();

    const fieldsToUpdate = [];
    const values = [];

    const addToUpdate = (field, value) => {
        if (value !== undefined && value !== null) {
            fieldsToUpdate.push(`${field} = ?`);
            values.push(value);
        }

    };

    addToUpdate('id_payment', id_payment);
    addToUpdate('invoice_id', invoice_id);
    addToUpdate('amount', amount);
    addToUpdate('payment_date', payment_date);

    if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar

    // Adaptar e query a los valores dados
    const fieldsString = fieldsToUpdate.join(', ');
    const query = `INSERT INTO Payments SET ${fieldsString}`;
    
    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
        const error = new Error('No se ha podido insertar el pago');
        error.code = 'INSERT_PAYMENT_ERROR';
        throw error;
    }

    return {message: 'Pago creado correctamente'};
}