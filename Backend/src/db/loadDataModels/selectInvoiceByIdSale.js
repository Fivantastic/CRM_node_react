import { getDBPool } from "../getPool.js";

export const selectInvoiceByIdSale = async (id_sale) => {
    try {
        const pool = getDBPool();
        const [rows] = await pool.query(
            "SELECT * FROM Invoices WHERE sale_id = ?",
            [id_sale]
        );
        return rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}