import { getDBPool } from '../../../db/getPool.js';

export const selectDeliveryNoteByIdShipmentModel = async (id) => {
    const pool = await getDBPool();
    const [rows] = await pool.query('SELECT * FROM `DeliveryNotes` WHERE `id_note` = ?', [id]);
    return rows[0];
}