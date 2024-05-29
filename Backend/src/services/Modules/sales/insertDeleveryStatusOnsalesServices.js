import { getDBPool } from "../../../db/getPool.js";

export const insertDeleveryStatusOnsalesServices = async (sale_id, cancel ) => {
    const pool = await getDBPool();
  
    const [result] = await pool.query(
      `UPDATE Sales SET operation_status = ? WHERE id_sale = ?`,
      [cancel, sale_id]
    );
    return result;
  };
  