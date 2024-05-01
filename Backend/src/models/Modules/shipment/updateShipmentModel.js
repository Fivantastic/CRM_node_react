import { getDBPool } from '../../../db/getPool.js';

export const updateShipmentModel = async (
  shipmentId,
  customer_id,
  newAddressId,
  deliveryNote_id,
  additional_notes
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

  addToUpdate('id_shipment', shipmentId);
  addToUpdate('customer_id', customer_id);
  addToUpdate('address_id', newAddressId);
  addToUpdate('deliveryNote_id', deliveryNote_id);
  addToUpdate('additional_notes', additional_notes);

  if (fieldsToUpdate.length === 0) return {};

  const query = `UPDATE Shipments SET ${fieldsToUpdate.join(', ')} WHERE id_shipment = ?`;
  values.push(shipmentId);

  const [result] = await pool.query(query, values);

  // Si no se ha actualizado ningún cliente, lanzar un error.
  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido actualizar el envio');
    error.httpStatus = 500;
    error.code = 'UPDATE_SHIPMENT_ERROR';
    throw error;
  }

  // Devolver el resultado.
  return { message: 'Cliente actualizado correctamente' };
};
