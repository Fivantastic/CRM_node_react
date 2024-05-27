import { getDBPool } from '../../../db/getPool.js';

export const insertShipmentModel = async ({ shipmentId, ref, customer_id, address_id, deliveryNote_id, additional_notes }) => {
  const pool = getDBPool();

  const [result] = await pool.query(
    'INSERT INTO Shipments (id_shipment, ref_SH, customer_id, address_id, deliveryNote_id, additional_notes) VALUES (?, ?, ?, ?, ?, ?)',
    [shipmentId, ref, customer_id, address_id, deliveryNote_id, additional_notes]
  );
  return result;
};
