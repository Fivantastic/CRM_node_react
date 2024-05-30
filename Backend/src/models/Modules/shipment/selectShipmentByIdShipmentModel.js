import { getDBPool } from '../../../db/getPool.js';

export const selectShipmentByIdShipmentModel = async (shipmentId) => {
    const pool = await getDBPool();
    const [rows] = await pool.query('SELECT * FROM Shipments WHERE id_shipment = ?', [shipmentId]);
    return rows[0];
}