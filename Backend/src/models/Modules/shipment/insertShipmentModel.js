import { getDBPool } from '../../../db/getPool.js';

export const insertShipmentModel = async (
  shipmentId,
  customer_id,
  address_id,
  deliveryNote_id,
  tracking_number,
  additional_notes
) => {
  const pool = getDBPool();

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
  addToUpdate('address_id', address_id);
  addToUpdate('deliveryNote_id', deliveryNote_id);
  addToUpdate('tracking_number', tracking_number);
  addToUpdate('additional_notes', additional_notes);

  if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar

  const query = `INSERT INTO Shipments (id_shipment, customer_id, address_id, deliveryNote_id, tracking_number, additional_notes ) VALUES (?, ?, ?, ?, ?, ?)`;
  values.push(shipmentId);

  const [result] = await pool.query(query, values);

  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido insertar el envio');
    error.code = 'INSERT_SHIPMENT_ERROR';
    throw error;
  }
  return { message: 'Envio creado exitosamente' };
};
