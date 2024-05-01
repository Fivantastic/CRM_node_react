import { getDBPool } from "../getPool.js";

export const selectShipmentByIdDeliveryNote = async (id_delivery_note) => {
    try {
        const pool = getDBPool();
        const [rows] = await pool.query(
            "SELECT * FROM Shipments WHERE deliveryNote_id = ?",
            [id_delivery_note]
        );
        return rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}