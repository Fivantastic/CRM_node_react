import { getDBPool } from '../../../db/getPool.js';

export const deleteDeliveryNoteModel = async (deliveryNote_id) => {
  const pool = await getDBPool();

  // Establecer el campo deliveryNote_id a NULL en la tabla Modules
  await pool.query('UPDATE Modules SET deliveryNote_id = NULL WHERE deliveryNote_id = ?', [
    deliveryNote_id,
  ]);

  // Eliminar el registro de la tabla DeliveryNotes
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
