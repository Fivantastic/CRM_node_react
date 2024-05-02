import { getDBPool } from '../../db/getPool.js';
import { notFoundError } from '../../services/error/errorService.js';

export const getModuleSalesModel = async (searchTerm) => {
  const pool = getDBPool();

  if (searchTerm && searchTerm.trim() !== '') {
    // Si searchTerm está definido, aplica el filtro de búsqueda
    const result = await pool.query(
      `SELECT Users.name AS salesAgent, Users.last_name AS salesAgent_lastName, Products.name AS product_name, Products.price AS product_price, SalesProducts.quantity AS quantity, Customers.name AS customer, Customers.email AS customer_email, Customers.phone AS customer_phone, Sales.operation_status, Sales.create_at, Sales.update_at
       FROM Sales
       LEFT JOIN Users ON Sales.user_id = Users.id_user
       LEFT JOIN SalesProducts ON Sales.saleProduct_id = SalesProducts.id_saleProduct
       LEFT JOIN Products ON SalesProducts.product_id = Products.id_product
       LEFT JOIN Customers ON Sales.customer_id = Customers.id_customer
       WHERE Sales.operation_status LIKE ?`,
      [`%${searchTerm}%`]
    );
    if (!result || result.length === 0) {
      notFoundError('Sales');
    }
    return result[0];
  } else {
    // Si searchTerm no está definido o es una cadena vacía, devuelve todos los resultados
    const result = await pool.query(
      `SELECT Users.name AS salesAgent, Users.last_name AS salesAgent_lastName, Products.name AS product_name, Products.price AS product_price, SalesProducts.quantity AS quantity, Customers.name AS customer, Customers.email AS customer_email, Customers.phone AS customer_phone, Sales.operation_status, Sales.create_at, Sales.update_at
       FROM Sales
       LEFT JOIN Users ON Sales.user_id = Users.id_user
       LEFT JOIN SalesProducts ON Sales.saleProduct_id = SalesProducts.id_saleProduct
       LEFT JOIN Products ON SalesProducts.product_id = Products.id_product
       LEFT JOIN Customers ON Sales.customer_id = Customers.id_customer`
    );
    return result[0];
  }
};
