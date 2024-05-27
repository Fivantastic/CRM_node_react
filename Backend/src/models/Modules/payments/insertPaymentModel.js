import { getDBPool } from "../../../db/getPool.js";
                                        // idPayment, invoice_id, payment_date
export const insertPaymentModel = async (id_payment, ref, invoice_id, payment_date)=> {
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
    addToUpdate('ref_PM', ref);
    addToUpdate('invoice_id', invoice_id);
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

    const selectQuery = `
      SELECT Payments.id_payment,
         Invoices.id_invoice,
         Invoices.ref_IN,
         Invoices.agentUser_id AS salesAgent,
         Customers.name AS customer,
         Customers.email AS customer_email,
         Customers.phone AS customer_phone,
         Customers.company_name,
         Invoices.total_amount AS paid_amount, 
         Payments.ref_PM,
         Payments.payment_status,
         Payments.payment_date,
         Payments.create_at,
         Payments.update_at
      FROM Payments
      LEFT JOIN Invoices ON Payments.invoice_id = Invoices.id_invoice
      LEFT JOIN Customers ON Invoices.customer_id = Customers.id_customer
      WHERE Payments.id_payment = ?
    `;
    const [paymentResult] = await pool.query(selectQuery, [id_payment]);


    return paymentResult[0];
}