import { getDBPool } from '../../../db/getPool.js';

export const selectShipmentByIdModel = async (shipmentId) => {
  const pool = await getDBPool();

  // Comprobar si existe un envio con el id proporcionado.
  const [shipment] = await pool.query(
    `SELECT * FROM Shipments WHERE id_shipment = ?`,
    [shipmentId]
  );

  return shipment[0];
};
