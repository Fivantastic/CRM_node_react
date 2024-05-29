import { getDBPool } from '../../../db/getPool.js';

export const selectShipmentByrefSH = async (ref_SH) => {
  const pool = await getDBPool();
  const [result] = await pool.query(
    'SELECT id_shipment FROM Shipments WHERE ref_SH = ?',
    [ref_SH]
  );
  return result[0];
};
