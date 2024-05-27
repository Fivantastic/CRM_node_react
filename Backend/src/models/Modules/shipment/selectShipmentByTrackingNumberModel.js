import { getDBPool } from '../../../db/getPool.js';

export const selectShipmentByTrackingNumberModel = async (trackingNumber) => {
  const pool = await getDBPool();
  const [rows] = await pool.query(
    'SELECT id_shipment FROM Shipments WHERE tracking_number = ?',
    [trackingNumber]
  );
  return rows[0];
};
