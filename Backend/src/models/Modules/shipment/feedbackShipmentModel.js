import { getDBPool } from '../../../db/getPool.js';

export const feedbackShipmentModel = async (
  id_shipment,
  rating_shipment,
  comment_shipment
) => {
  const pool = await getDBPool();

  // Insertar el rating y comentario en la base de datos del envío
  const [result] = await pool.query(
    'UPDATE Modules SET rating_module = ?, rating_comment = ? WHERE shipment_id = ?',
    [rating_shipment, comment_shipment, id_shipment]
  );
  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido insertar el feedback del envío');
    error.code = 'FEEDBACK_SHIPMENT_ERROR';
    throw error;
  }

  return { message: 'Valoración del envío insertada correctamente' };
};
