import { getDBPool } from "../../../db/getPool.js";

export const checkSaleOwnershipModel = async (user_id, id_sale) => {
  const pool = await getDBPool();

  const [result] = await pool.query(
    `SELECT * FROM Sales
        WHERE id_sale = ? AND user_id = ?;
        `,
    [id_sale, user_id]
  );

  if (result.length === 0){
    return false;
  }

  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido seleccionar la venta.');
    error.code = 'SELECT_SALES_ERROR';
    throw error;
  }
  
  console.log({
    user_id,
    id_sale,
    message: 'The user is owner of the sale'
  });
  return result;
};