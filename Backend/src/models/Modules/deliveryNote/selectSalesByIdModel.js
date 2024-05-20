import { getDBPool } from '../../../db/getPool.js';

export const selectSalesByIdModel = async (id) => {
    const pool = await getDBPool();
    const query = 'SELECT * FROM Sales WHERE id_sale = ?';
    const [rows] = await pool.query(query, [id]);
    return rows;
}