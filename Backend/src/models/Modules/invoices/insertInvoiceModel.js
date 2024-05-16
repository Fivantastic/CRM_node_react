import { getDBPool } from "../../../db/getPool.js";

export const insertInvoiceModel = async (idInvoice, ref, userId, sale_id, customer_id, company_name, NIF, addressComplete, total_price, including_tax, total_amount, payment_method, due_date) => {
    const pool = getDBPool();

    const fieldsToUpdate = [];
    const values = [];

    const addToUpdate = (field, value) => {
        fieldsToUpdate.push(`${field} = ?`);
        values.push(value);
    };

    addToUpdate('id_invoice', idInvoice);
    addToUpdate('ref_IN', ref);
    addToUpdate('agentUser_id', userId);
    addToUpdate('sale_id', sale_id);
    addToUpdate('customer_id', customer_id);
    addToUpdate('company_name', company_name);
    addToUpdate('NIF', NIF);
    addToUpdate('address', addressComplete);
    addToUpdate('total_price', total_price);
    addToUpdate('including_tax', including_tax);
    addToUpdate('total_amount', total_amount);
    addToUpdate('payment_method', payment_method);
    addToUpdate('due_date', due_date);

    if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar

    const fieldsString = fieldsToUpdate.join(', ');

    const query = `INSERT INTO Invoices SET ${fieldsString}`;
    
    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
        const error = new Error('No se ha podido insertar la factura');
        error.code = 'INSERT_INVOICE_ERROR';
        throw error;
    }

    return { message: 'Factura creada correctamente' };
};
