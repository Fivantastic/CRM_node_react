import { getDBPool } from "../../db/getPool.js";

export const selectDeliveryNoteSearchModel = async (search) => {
    const pool = getDBPool();

    const [rows] = await pool.query(
        `SELECT 
            dn.id_note, 
            c.name AS customer_name,
            p.name AS product_name
        FROM 
            DeliveryNotes dn
        LEFT JOIN 
            Customers c ON dn.customer_id = c.id_customer
        LEFT JOIN 
            Sales s ON dn.sale_id = s.id_sale
        LEFT JOIN 
            SalesProducts sp ON s.saleProduct_id = sp.id_saleProduct
        LEFT JOIN 
            Products p ON sp.product_id = p.id_product
        WHERE 
            c.name LIKE ? OR
            p.name LIKE ?;`,
        [`%${search}%`, `%${search}%`]
    );

    return rows;
}
