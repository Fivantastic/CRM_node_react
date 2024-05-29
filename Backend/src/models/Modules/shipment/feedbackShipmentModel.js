import { getDBPool } from '../../../db/getPool.js';

export const feedbackShipmentModel = async (id_shipment, rating_module, rating_comment) => {
  const pool = await getDBPool();

  // Verificar si el shipment_id existe en la tabla Modules
  const [checkResult] = await pool.query(
    'SELECT COUNT(*) AS count FROM Modules WHERE shipment_id = ?',
    [id_shipment]
  );

  if (checkResult[0].count === 0) {
    // Insertar nuevo registro en Modules si no existe
    const [insertResult] = await pool.query(
      'INSERT INTO Modules (shipment_id, rating_module, rating_comment) VALUES (?, ?, ?)',
      [id_shipment, rating_module, rating_comment]
    );

    console.log(`Feedback insert result: ${JSON.stringify(insertResult)}`);

    if (insertResult.affectedRows === 0) {
      const error = new Error('No se ha podido insertar el feedback del envío');
      error.code = 'FEEDBACK_SHIPMENT_ERROR';
      throw error;
    }

    return { message: 'Valoración del envío insertada correctamente' };
  } else {
    // Actualizar el rating y comentario en la base de datos del envío
    const [updateResult] = await pool.query(
      'UPDATE Modules SET rating_module = ?, rating_comment = ? WHERE shipment_id = ?',
      [rating_module, rating_comment, id_shipment]
    );

    console.log(`Feedback update result: ${JSON.stringify(updateResult)}`);

    if (updateResult.affectedRows === 0) {
      const error = new Error('No se ha podido insertar el feedback del envío');
      error.code = 'FEEDBACK_SHIPMENT_ERROR';
      throw error;
    }

    return { message: 'Valoración del envío actualizada correctamente' };
  }
};
