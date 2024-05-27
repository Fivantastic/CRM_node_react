import { getDBPool } from '../../../db/getPool.js';

export const deleteModulesByShipmentIdModel = async (shipmentId) => {
  const pool = await getDBPool();
  const [result] = await pool.query(
    'DELETE FROM Modules WHERE shipment_id = ?',
    [shipmentId]
  );
  return result;
};
