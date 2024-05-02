import { getDBPool } from '../../db/getPool.js';

export const getModuleInvoiceModel = async (searchTerm) => {
  const pool = getDBPool();

  if (searchTerm && searchTerm.trim() !== '') {
    // Si searchTerm está definido, aplica el filtro de búsqueda
    const result = await pool.query(
      `SELECT Invoices.id_invoice, Users.name AS agent_name, Users.last_name AS agent_Last_name, Products.name AS product, Products.price AS product_price, SalesProducts.quantity AS quantity, Sales.id_sale, Customers.name AS customer_name, Invoices.company_name, Invoices. NIF, Invoices. address, Invoices.total_price, Invoices.including_tax, Invoices.total_amount, Invoices.payment_method, Invoices.invoice_status, Invoices.due_date, Invoices.creation_at, Invoices.update_at
       FROM Invoices
       LEFT JOIN Users ON Invoices.agentUser_id = Users.id_user
       LEFT JOIN Sales ON Invoices.sale_id = Sales.id_sale
       LEFT JOIN SalesProducts ON Sales.saleProduct_id = SalesProducts.id_saleProduct
       LEFT JOIN Products ON SalesProducts.product_id = Products.id_product
       LEFT JOIN Customers ON Invoices.customer_id = Customers.id_customer
       WHERE Invoices.invoice_status LIKE ?`,
      [`%${searchTerm}%`]
    );

    if (!result || result.length === 0) {
      notFoundError('Invoices');
    }

    return result[0];
  } else {
    // Si searchTerm no está definido o es una cadena vacía, devuelve todos los resultados
    const result = await pool.query(
      `SELECT Invoices.id_invoice, Users.name AS agent_name, Users.last_name AS agent_Last_name, Products.name AS product, Products.price AS product_price, SalesProducts.quantity AS quantity, Customers.name AS customer_name, Invoices.company_name, Invoices. NIF, Invoices. address, Invoices.total_price, Invoices.including_tax, Invoices.total_amount, Invoices.payment_method, Invoices.invoice_status, Invoices.due_date, Invoices.creation_at, Invoices.update_at
       FROM Invoices
       LEFT JOIN Users ON Invoices.agentUser_id = Users.id_user
       LEFT JOIN Sales ON Invoices.sale_id = Sales.id_sale
       LEFT JOIN SalesProducts ON Sales.saleProduct_id = SalesProducts.id_saleProduct
       LEFT JOIN Products ON SalesProducts.product_id = Products.id_product
       LEFT JOIN Customers ON Invoices.customer_id = Customers.id_customer`
    );
    return result[0];
  }
};
