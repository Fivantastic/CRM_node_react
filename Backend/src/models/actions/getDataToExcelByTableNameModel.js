import { getDBPool } from '../../db/getPool.js';

export const getDataToExcelByTable = async (tables) => {
  const pool = await getDBPool();
  let combinedData = [];

  const sql = `
    SELECT 
      Sales.ref_SL AS Ref,
      Sales.operation_status AS Estado,
      Sales.create_at AS Fecha_de_Creacion,
      Customers.company_name AS Empresa,
      CONCAT(Customers.name, ' ', Customers.last_name) AS Nombre,
      Customers.email AS Email,
      Customers.phone AS Telefono,
      Products.name AS Producto,
      Products.price AS Precio,
      SalesProducts.quantity AS Cantidad,
      CONCAT(Users.name, ' ', Users.last_name) AS Comercial
    FROM Sales
    JOIN Customers ON Sales.customer_id = Customers.id_customer
    JOIN SalesProducts ON Sales.saleProduct_id = SalesProducts.id_saleProduct
    JOIN Products ON SalesProducts.product_id = Products.id_product
    JOIN Users ON Sales.user_id = Users.id_user
  `;

  const [rows] = await pool.query(sql);

  combinedData = combinedData.concat(rows);

  return combinedData;
};
