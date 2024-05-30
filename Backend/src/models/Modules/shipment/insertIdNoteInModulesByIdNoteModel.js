import { getDBPool } from '../../../db/getPool.js';

export const insertIdShipmentInModulesByIdNoteModel = async ( idNote, idShipment) => {
    const pool = await getDBPool();
    const query = `UPDATE Modules SET shipment_id = ? WHERE deliveryNote_id = ?`;
    const [result] = await pool.query(query, [idShipment, idNote]);
    return result;
}