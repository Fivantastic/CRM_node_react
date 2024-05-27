import { getDBPool } from '../../../db/getPool.js';

export const selectModuleByIdSaleModel = async (sale_id) => {
  const pool = await getDBPool();
    console.log(sale_id);
  // Comprobar si existe un cliente con el id proporcionado.
  const [Modules] = await pool.query(
    `SELECT * FROM Modules WHERE sale_id = ?`,
    [sale_id]
  );

  return Modules[0];
};
