import { getDBPool } from '../../../db/getPool.js';

export const feedbackShipmentModel = {
  updateFeedback: async (id_shipment, rating_module, rating_comment) => {
    const pool = await getDBPool();

    // Actualizar el rating y comentario en la base de datos del envío
    const [updateResult] = await pool.query(
      'UPDATE Modules SET rating_module = ?, rating_comment = ? WHERE shipment_id = ?',
      [rating_module, rating_comment, id_shipment]
    );

    if (updateResult.affectedRows === 0) {
      const error = new Error('No se ha podido actualizar el feedback del envío. El registro no existe.');
      error.code = 'FEEDBACK_SHIPMENT_ERROR';
      throw error;
    }

    return { message: 'Valoración del envío actualizada correctamente' };
  },

  checkFeedbackExists: async (id_shipment) => {
    const pool = await getDBPool();
    const [rows] = await pool.query('SELECT rating_module FROM Modules WHERE shipment_id = ?', [id_shipment]);
    return rows.length > 0 && rows[0].rating_module !== null;
  }
};
