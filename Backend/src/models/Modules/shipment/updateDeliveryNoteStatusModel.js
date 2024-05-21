import { getDBPool } from '../../../db/getPool.js';

export const updateDeliveryNoteStatusModel = async (id_note, delivery_status) => {
    const pool = await getDBPool();
    const [result] = await pool.query(
        'UPDATE DeliveryNotes SET delivery_status = ? WHERE id_note = ?',
        [delivery_status, id_note]
    );
    return result;
};
