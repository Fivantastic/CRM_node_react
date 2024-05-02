import { getDBPool } from '../../../db/getPool.js';

export const deleteDeliveryNoteModel = async (deliveryNote_id) => {
  const pool = await getDBPool();

  // elimino del las tablas todos los pagos relacionados
  await pool.query('DELETE FROM Shipments WHERE deliveryNote_id = ? ', [
    deliveryNote_id,
  ]);

  await pool.query('DELETE FROM Modules WHERE deliveryNote_id = ? ', [
    deliveryNote_id,
  ]);

  const [result] = await pool.query(
    'DELETE FROM DeliveryNotes WHERE id_note = ?',
    [deliveryNote_id]
  );

  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido eliminar el albaran');
    error.code = 'DELETE_DELIVERY_NOTET_ERROR';
    throw error;
  }
  return { message: 'Albaran eliminado correctamente' };
};
