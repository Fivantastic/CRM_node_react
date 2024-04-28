import { getDBPool } from "../../../db/getPool.js";

export const deleteSaleModel = async (id_sale) => {
  const pool = await getDBPool();

  const [result] = await pool.query(
    `DELETE FROM Sales
    WHERE id_sale = ?;
    `,
    [id_sale]
  );

  if (result.length === 0){
    return false;
  }

  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido eliminar la venta.');
    error.code = 'DELETE_SALES_ERROR';
    throw error;
  }
  
  return result;
};