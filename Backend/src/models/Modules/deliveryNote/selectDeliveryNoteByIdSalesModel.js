import { getDBPool } from '../../../db/getPool.js';


export const selectDeliveryNoteByIdSalesModel = async (id_sale) => {
    const pool = await getDBPool();

    const [result] = await pool.query(
        'SELECT * FROM DeliveryNotes WHERE sale_id = ?',
        [id_sale]
    );

    if (!result || result.length === 0) {
        return false;
    }

    return result[0];
}
