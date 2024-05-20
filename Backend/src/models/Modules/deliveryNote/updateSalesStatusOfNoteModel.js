import { getDBPool } from '../../../db/getPool.js';

export const updateSalesStatusOfNoteModel = async (id_sale, operation_status) => {
    const pool = await getDBPool();
    const [result] = await pool.query(
        'UPDATE Sales SET operation_status = ? WHERE id_sale = ?',
        [operation_status, id_sale]
    );
}