import { getDBPool } from '../../db/getPool.js';

export const selectProductSearchModel = async (search) => {
  const pool = getDBPool();

  const [rows] = await pool.query(
    'SELECT * FROM Products WHERE name LIKE? OR ref_PR LIKE?',
    [`%${search}%`, `%${search}`]
  );

  return rows;
};
