import { getDBPool } from '../db/getPool.js';

export const getPendingSales = async () => {
  const pool = getDBPool();
  const query = `
    SELECT 
      s.id_sale, 
      c.name as customer_name, 
      c.id_customer, 
      c.address_id,
      sp.id_saleProduct,
      u.id_user as deliverer_id
    FROM Sales s
    JOIN Customers c ON s.customer_id = c.id_customer
    JOIN SalesProducts sp ON s.saleProduct_id = sp.id_saleProduct
    JOIN Users u ON s.user_id = u.id_user -- Ajusta esta relación según sea necesario
    WHERE s.operation_status = 'open'
  `;
  const [rows] = await pool.query(query);
  console.log('Pending sales:', rows); // Añade este log

  return rows;
};
