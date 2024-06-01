import { getDBPool } from '../../../db/getPool.js';

export const selectSalesListModel = async () => {
  const pool = getDBPool();

  // Obtener todas las ventas
  const result =
    await pool.query(`SELECT Sales.id_sale, Sales.ref_SL, Users.name AS salesAgent, Users.last_name AS salesAgent_lastName, Products.name AS product_name, Products.price AS product_price, SalesProducts.quantity AS quantity, Customers.name AS customer, Customers.last_name AS customer_lastname, Customers.email AS customer_email, Customers.company_name, Customers.phone AS customer_phone, Sales.operation_status, Sales.create_at, Sales.update_at
  FROM Sales
  LEFT JOIN Users ON Sales.user_id = Users.id_user
  LEFT JOIN SalesProducts ON Sales.saleProduct_id = SalesProducts.id_saleProduct
  LEFT JOIN Products ON SalesProducts.product_id = Products.id_product
  LEFT JOIN Customers ON Sales.customer_id = Customers.id_customer
  ORDER BY Sales.ref_SL DESC`);

  return result[0];
};
