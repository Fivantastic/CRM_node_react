import { getDBPool } from '../../db/getPool.js';

export const toggleProductActiveModel = async (id_product, value) => { 
    const pool =  getDBPool();

    const query = `UPDATE Products SET active = ? WHERE id_product = ?`;

    const [result] = await pool.query(query, [value, id_product]);
    if (result.affectedRows === 0) {
        const error = new Error('No se ha podido actualizar el estado del producto');
        error.httpStatus = 500;
        error.code = 'UPDATE_PRODUCT_ERROR';
        throw error;
    }
}