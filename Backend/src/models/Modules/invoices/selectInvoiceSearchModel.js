import { getDBPool } from "../../../db/getPool.js";

export const selectInvoiceSearchModel = async (search) => {
    const pool = getDBPool();

    // Si searchTerm está definido, aplica el filtro de búsqueda

  const [rows] = await pool.query(`SELECT 
    Invoices.ref_IN,
    Invoices.id_invoice, 
    Invoices.sale_id AS codigo_venta, 
    Users.name AS agent_name, 
    Users.last_name AS agent_Last_name, 
    Products.name AS product, 
    Products.price AS product_price, 
    SalesProducts.quantity AS quantity, 
    Customers.name AS customer_name, 
    Invoices.company_name, 
    Invoices.NIF, Invoices.address, 
    Invoices.total_price, 
    Invoices.including_tax, 
    Invoices.total_amount, 
    Invoices.payment_method, 
    Invoices.invoice_status, 
    Invoices.due_date, 
    Invoices.creation_at, 
    Invoices.update_at,
    Sales.ref_SL
    FROM Invoices
    LEFT JOIN Users ON Invoices.agentUser_id = Users.id_user
    LEFT JOIN Sales ON Invoices.sale_id = Sales.id_sale
    LEFT JOIN SalesProducts ON Sales.saleProduct_id = SalesProducts.id_saleProduct
    LEFT JOIN Products ON SalesProducts.product_id = Products.id_product
    LEFT JOIN Customers ON Invoices.customer_id = Customers.id_customer 
    
    WHERE Invoices.id_invoice LIKE?
    OR Users.name LIKE?
    OR Users.last_name LIKE?
    OR Products.name LIKE?
    OR Products.price LIKE? 
    OR Invoices.total_amount LIKE?
    OR Invoices.ref_IN LIKE?
    OR Sales.ref_SL LIKE?`,
    
    [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]);

    console.log(`Resultados encontrados: ${rows.length}`);
    return rows;
}