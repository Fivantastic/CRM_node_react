import { getDBPool } from '../../db/getPool.js';  

export const selectModuleByIdModel = async (moduleId) => {
  const pool = await getDBPool();

  // Comprobar si existe un servicio con el id proporcionado.
  const [customer] = await pool.query(
    `SELECT * FROM Modules WHERE id_module = ?`,
    [moduleId]
  );

  return customer[0];
};
