import { getDBPool } from '../../../db/getPool.js';

export const deletePaymentModel = async (paymentsId) => {
  const pool = await getDBPool();

  // elimino del las tablas todos los pagos relacionados
  await pool.query('DELETE FROM Modules WHERE payment_id = ? ', [paymentsId]);

  const [result] = await pool.query(
    'DELETE FROM Payments WHERE id_payment = ?',
    [paymentsId]
  );

  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido eliminar el pago');
    error.code = 'DELETE_PAYMENT_ERROR';
    throw error;
  }
  return { message: 'Pago eliminado correctamente' };
};
