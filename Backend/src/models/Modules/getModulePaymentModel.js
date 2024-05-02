import { getDBPool } from '../../db/getPool.js';

export const getModulePaymentModel = async (searchTerm) => {
  const pool = getDBPool();

  if (searchTerm && searchTerm.trim() !== '') {
    // Si searchTerm está definido, aplica el filtro de búsqueda
    const result = await pool.query(
      `SELECT Payments.id_payment, Products.name AS product, Products.price AS product_price, SalesProducts.quantity AS quantity, Invoices.including_tax AS including_tax, Payments.amount, Payments.payment_status, Payments.payment_date
       FROM Payments
       LEFT JOIN Invoices ON Payments.invoice_id = Invoices.id_invoice
       LEFT JOIN Sales ON Invoices.sale_id = Sales.id_sale
       LEFT JOIN SalesProducts ON Sales.saleProduct_id = SalesProducts.id_saleProduct
       LEFT JOIN Products ON SalesProducts.product_id = Products.id_product
       WHERE Payments.payment_status LIKE ?`,
      [`%${searchTerm}%`]
    );

    if (!result || result.length === 0) {
      notFoundError('Payments');
    }

    return result[0];
  } else {
    // Si searchTerm no está definido o es una cadena vacía, devuelve todos los resultados
    const result = await pool.query(
      `SELECT Payments.id_payment, Products.name AS product, Products.price AS product_price, SalesProducts.quantity AS quantity, Invoices.including_tax AS including_tax, Payments.amount, Payments.payment_status, Payments.payment_date
       FROM Payments
       LEFT JOIN Invoices ON Payments.invoice_id = Invoices.id_invoice
       LEFT JOIN Sales ON Invoices.sale_id = Sales.id_sale
       LEFT JOIN SalesProducts ON Sales.saleProduct_id = SalesProducts.id_saleProduct
       LEFT JOIN Products ON SalesProducts.product_id = Products.id_product`
    );
    return result[0];
  }
};
