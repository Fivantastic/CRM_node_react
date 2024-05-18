import { getDBPool } from "../../../db/getPool.js";

export const selectPaymentSearchModel = async (search) => {
    const pool = getDBPool();

 // Si searchTerm está definido, aplica el filtro de búsqueda

 const [rows] = await pool.query(`
 SELECT Payments.id_payment,
        Invoices.id_invoice,
        Invoices.agentUser_id AS salesAgent,
        Customers.name AS customer,
        Customers.email AS customer_email,
        Customers.phone AS customer_phone,
        Invoices.total_amount AS paid_amount, 
        Payments.payment_status,
        Payments.payment_date,
        Payments.create_at,
        Payments.update_at
 FROM Payments
 LEFT JOIN Invoices ON Payments.invoice_id = Invoices.id_invoice
 LEFT JOIN Customers ON Invoices.customer_id = Customers.id_customer
 
 WHERE Customers.name LIKE? 
 OR Customers.email LIKE? 
 OR Invoices.id_invoice LIKE? 
 OR Invoices.total_amount LIKE? 
`,[`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`] ); //? Tengo que poner el nombre o el 'as x'?

  console.log(`Resultados encontrados: ${rows.length}`);
  return rows;
}