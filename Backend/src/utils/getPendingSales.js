import { getDBPool } from '../db/getPool.js';

export const getPendingSales = async (id_sale) => {
  const pool = getDBPool();
  const query = `
    SELECT 
      s.id_sale,
      s.ref_SL, 
      c.name as customer_name, 
      c.id_customer, 
      c.address_id,
      sp.id_saleProduct
    FROM Sales s
    JOIN Customers c ON s.customer_id = c.id_customer
    JOIN SalesProducts sp ON s.saleProduct_id = sp.id_saleProduct
    WHERE s.operation_status = 'open'
  `;
  const [rows] = await pool.query(query);

  return rows;
};
