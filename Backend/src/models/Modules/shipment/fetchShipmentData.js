import { getDBPool } from '../../../db/getPool.js';

export const fetchShipmentData = async (shipmentId) => {
  const pool = await getDBPool();
  console.log(`Fetching shipment data for shipmentId: ${shipmentId}`);
  const [rows] = await pool.query('SELECT deliveryNote_id, customer_id, tracking_number, ref_SH FROM Shipments WHERE id_shipment = ?', [shipmentId]);
  console.log(`Shipment data retrieved: ${JSON.stringify(rows)}`);
  return rows[0];
}
