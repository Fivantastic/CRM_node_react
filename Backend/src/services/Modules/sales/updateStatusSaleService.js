import { getDBPool } from '../../../db/getPool.js';

export const updateStatusSaleService = async (id, newStatus) => {
  const pool = await getDBPool();

  const [result] = await pool.query(
    `UPDATE Sales SET operation_status = ? WHERE id_sale = ?`,
    [newStatus, id]
  );
  return result;
};
