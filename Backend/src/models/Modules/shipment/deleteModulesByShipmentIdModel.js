import { getDBPool } from '../../../db/getPool.js';

export const updateModulesByShipmentIdModel = async (shipmentId) => {
  const pool = await getDBPool();
  const [result] = await pool.query(
    'UPDATE Modules SET shipment_id = NULL WHERE shipment_id = ?',
    [shipmentId]
  );
  return result;
};
