import { getDBPool } from '../../../db/getPool.js';

export const deleteDeliveryNoteModel = async (deliveryNote_id) => {
  const pool = await getDBPool();

  // Eliminar de las tablas todos los pagos relacionados
  await pool.query('DELETE FROM Modules WHERE deliveryNote_id = ? ', [
    deliveryNote_id,
  ]);

  await pool.query('DELETE FROM Shipments WHERE deliveryNote_id = ? ', [
    deliveryNote_id,
  ]);

  const [result] = await pool.query(
    'DELETE FROM DeliveryNotes WHERE id_note = ?',
    [deliveryNote_id]
  );

  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido eliminar el albarán');
    error.code = 'DELETE_DELIVERY_NOTE_ERROR';
    throw error;
  }
  return { message: 'Albarán eliminado correctamente' };
};
