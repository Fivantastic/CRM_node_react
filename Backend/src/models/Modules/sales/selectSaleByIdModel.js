import { getDBPool } from '../../../db/getPool.js';

export const selectSaleByIdModel = async (id_sale) => {
  const pool = await getDBPool();

  const [result] = await pool.query(
    `SELECT * FROM Sales
        WHERE id_sale = ?;
        `,
    [id_sale]
  );

  if (result.length === 0) {
    return false;
  }

  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido seleccionar la venta.');
    error.code = 'SELECT_SALES_ERROR';
    throw error;
  }

  return result[0];
};
