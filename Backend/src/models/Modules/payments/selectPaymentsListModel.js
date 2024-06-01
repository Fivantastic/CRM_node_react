import { getDBPool } from '../../../db/getPool.js';

export const selectPaymentsListModel = async () => {
  const pool = getDBPool();

  // Obtener todas los pagos
  const result =
  await pool.query(`
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
      Payments.create_at,
      Payments.update_at
    FROM Payments
    LEFT JOIN Invoices ON Payments.invoice_id = Invoices.id_invoice
    LEFT JOIN Sales ON Invoices.sale_id = Sales.id_sale
    LEFT JOIN Customers ON Invoices.customer_id = Customers.id_customer
    ORDER BY Payments.ref_PM DESC
    `);


  return result[0];
};