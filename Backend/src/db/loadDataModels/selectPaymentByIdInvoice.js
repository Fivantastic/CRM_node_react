import { getDBPool } from "../getPool.js";

export const selectPaymentByIdInvoice = async (id_invoice) => {
    try {
        const pool = getDBPool();
        const [rows] = await pool.query(
            "SELECT * FROM Payments WHERE invoice_id = ?",
            [id_invoice]
        );
        return rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}