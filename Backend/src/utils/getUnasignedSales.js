import { getDBPool } from '../db/getPool.js';

export const getUnasignedSales = async () => {
  const pool = getDBPool();
  const query = `
    SELECT
    s.id_sale,
    s.ref_SL,
    c.company_name as company,
    c.id_customer
    FROM Sales s
    LEFT JOIN Invoices i ON s.id_sale = i.sale_id
    JOIN Customers c ON s.customer_id = c.id_customer
    WHERE (s.operation_status = 'open' OR s.operation_status = 'processing')
    AND i.sale_id IS NULL
    ORDER BY s.ref_SL; 
  `;
  const [rows] = await pool.query(query);
  
  return rows;
};

