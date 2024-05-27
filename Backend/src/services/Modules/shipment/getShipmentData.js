import { getDBPool } from "../../../db/getPool.js";

export const getShipmentData = async (id) => {
    const pool = await getDBPool();
    const [result] = await pool.query(
        `SELECT * FROM Shipments WHERE id_shipment = ?`,
        [id]
    );
    return result[0];
}