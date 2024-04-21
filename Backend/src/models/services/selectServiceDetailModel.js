import { getDBPool } from '../../db/getPool.js';

export const selectServiceDetailModel = async (serviceId) => {
  const pool = getDBPool();

  // Obtener el detalle del servicio
  const result = await pool.query(
    `SELECT * FROM Services WHERE id_service = ?`,
    [serviceId]
  );

  return result[0];
};
