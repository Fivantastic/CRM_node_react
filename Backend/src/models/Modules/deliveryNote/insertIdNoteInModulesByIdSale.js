import { getDBPool } from '../../../db/getPool.js';

export const insertIdNoteInModulesByIdSaleModel = async (idSale, idNote) => {
    const pool = await getDBPool();
    const query = `UPDATE Modules SET deliveryNote_id = ? WHERE sale_id = ?`;
    const [result] = await pool.query(query, [idNote, idSale]);
    return result;
}