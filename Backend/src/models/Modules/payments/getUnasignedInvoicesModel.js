import { getDBPool } from '../../../db/getPool.js';

export const getUnasignedInvoicesModel = async () => {
    const pool = await getDBPool();

    const [result] = await pool.query(`
        SELECT
            I.id_invoice,
            I.ref_IN,
            I.agentUser_id AS salesAgent,
            I.customer_id,
            I.company_name,
            I.NIF,
            I.address,
            I.total_amount,
            I.payment_method,
            I.due_date
        FROM
            Invoices I
        LEFT JOIN
            Payments PA ON I.id_invoice = PA.invoice_id
        WHERE
            PA.id_payment IS NULL
    `);
    
    return result;
};
