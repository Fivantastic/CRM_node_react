import { getDBPool } from '../../../db/getPool.js';

export const updateShipmentStatus = async (shipmentId, newStatus) => {
  const pool = await getDBPool();
  await pool.query('UPDATE Shipments SET shipment_status = ?, update_at = CURRENT_TIMESTAMP WHERE id_shipment = ?', [newStatus, shipmentId]);
};
