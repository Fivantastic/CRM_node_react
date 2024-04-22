import { getDBPool } from '../../db/getPool.js';

export const selectServiceByIdModel = async (serviceId) => {
  const pool = await getDBPool();

  // Comprobar si existe un servicio con el id proporcionado.
  const [customer] = await pool.query(
    `SELECT * FROM Services WHERE id_service = ?`,
    [serviceId]
  );

  return customer[0];
};
