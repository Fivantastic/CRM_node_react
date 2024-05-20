import { getDBPool } from '../../db/getPool.js';

export const selectProductSearchModel = async (search) => {
  const pool = getDBPool();
  console.log(`Buscando en la base de datos con término: ${search}`);
  const [rows] = await pool.query(
    'SELECT * FROM Products WHERE name LIKE?  ref_PR LIKE?',
    [`%${search}%`, `%${search}`]
  );
  console.log(`Resultados encontrados: ${rows.length}`);
  return rows;
};
