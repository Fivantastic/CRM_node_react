import { getDBPool } from '../../../db/getPool.js';

export const selectPaymentByIdModel = async (paymentsId) => {
  const pool = await getDBPool();

  // Comprobar si existe un cliente con el id proporcionado.
  const [payment] = await pool.query(
    `SELECT * FROM Payments WHERE  id_payment = ?`,
    [paymentsId]
  );

  return payment[0];
};
