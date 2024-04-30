import { getDBPool } from "../../../db/getPool.js";

export const selectProductByIdModel = async (saleProdut_id) => {
  const pool = await getDBPool();
  const [rows] = await pool.query(
    "SELECT * FROM SalesProducts WHERE id_saleProduct = ?",
    [saleProdut_id]
  )
  return rows[0];
};
