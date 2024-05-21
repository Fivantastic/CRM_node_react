import { getDBPool } from '../../../db/getPool.js';

export const selectPendingDeliveryNotesModel = async () => {
  const pool = await getDBPool();

  const [rows] = await pool.query(`
    SELECT 
      DN.id_note, DN.ref_DN, DN.sale_id, DN.deliverer_id, DN.customer_id, DN.address_id, DN.saleProduct_id,
      C.name as customer_name
    FROM 
      DeliveryNotes DN
    JOIN 
      Customers C ON DN.customer_id = C.id_customer
    WHERE 
      DN.delivery_status = 'pending'
  `);

  return rows;
};
