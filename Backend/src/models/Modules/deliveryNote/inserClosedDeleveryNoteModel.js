import { getDBPool } from '../../../db/getPool.js';

export const inserClosedDeleveryNoteModel = async (
  deliveryNote_id,
  delivery_status
) => {
  const pool = await getDBPool();

  const fieldsToUpdate = [];
  const values = [];

  const addToUpdate = (field, value) => {
    if (value !== undefined && value !== null) {
      fieldsToUpdate.push(`${field} = ?`);
      values.push(value);
    }
  };

  addToUpdate('delivery_status', delivery_status);

  if (fieldsToUpdate.length === 0) return {};

  const query = `UPDATE DeliveryNotes SET ${fieldsToUpdate.join(', ')} WHERE id_note = ?`;
  values.push(deliveryNote_id);

  const [result] = await pool.query(query, values);

  // Si no se ha actualizado ningún cliente, lanzar un error.
  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido actualizar el DeliveryNotes');
    error.httpStatus = 500;
    error.code = 'UPDATE_DELEVERY_NOTE_ERROR';
    throw error;
  }

  // Devolver el resultado.
  return { message: 'DeliveryNotes actualizado correctamente' };
};
