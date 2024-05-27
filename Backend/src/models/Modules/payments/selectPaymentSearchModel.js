import { getDBPool } from "../../../db/getPool.js";

export const selectPaymentSearchModel = async (search) => {
    const pool = getDBPool();

 // Si searchTerm está definido, aplica el filtro de búsqueda

 const [rows] = await pool.query(`
 SELECT 
 Payments.id_payment,
 Payments.ref_PM,
 Sales.ref_SL,
 Invoices.id_invoice,
 Invoices.ref_IN,
 Invoices.agentUser_id AS salesAgent,
 Customers.name AS customer,
 Customers.email AS customer_email,
 Customers.phone AS customer_phone,
 Customers.company_name,
 Invoices.total_amount AS paid_amount, 
 Payments.payment_status,
 Payments.payment_date,
 Payments.create_at
FROM Payments
LEFT JOIN Invoices ON Payments.invoice_id = Invoices.id_invoice
LEFT JOIN Sales ON Invoices.sale_id = Sales.id_sale
LEFT JOIN Customers ON Invoices.customer_id = Customers.id_customer
 
 WHERE Customers.company_name LIKE? 
 OR Customers.email LIKE? 
 OR Invoices.id_invoice LIKE? 
 OR Invoices.total_amount LIKE? 
 OR Payments.ref_PM LIKE?
 OR Invoices.ref_IN LIKE?
 OR Sales.ref_SL LIKE?
`,[`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`  ] );

  console.log(`Resultados encontrados: ${rows.length}`);
  return rows;
}