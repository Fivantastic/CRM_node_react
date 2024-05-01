import { getDBPool } from '../../db/getPool.js';

export const selectSaleProductByIdModel = async (saleProduct_id) => {
    const pool = await getDBPool();
    const [rows] = await pool.query('SELECT * FROM SalesProducts WHERE id_saleProduct = ?', [saleProduct_id]);
    return rows[0];
}