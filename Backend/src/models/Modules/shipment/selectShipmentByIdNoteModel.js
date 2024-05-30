import { getDBPool } from '../../../db/getPool.js';

export const selectShipmentByIdNoteModel = async (id) => {
    const pool = await getDBPool();
    const [rows] = await pool.query(
        'SELECT * FROM `Shipments` WHERE `deliveryNote_id` = ?',
        [id]
    );
    return rows[0];
}