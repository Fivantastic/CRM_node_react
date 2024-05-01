import { getDBPool } from "../getPool.js";

export const selectDeliveryNoteByIdSale = async (id_sale) => {
    try {
        const pool = getDBPool();
        const [rows] = await pool.query(
            "SELECT * FROM DeliveryNotes WHERE sale_id = ?",
            [id_sale]
        );
        return rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}