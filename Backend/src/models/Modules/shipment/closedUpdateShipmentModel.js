import { getDBPool } from '../../../db/getPool.js';

export const closedUpdateShipmentModel = async (
  shipmentId,
  shipment_status
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
  addToUpdate('shipment_status', shipment_status);

  if (fieldsToUpdate.length === 0) return {};

  const query = `UPDATE Shipments SET ${fieldsToUpdate.join(', ')} WHERE id_shipment = ?`;
  values.push(shipmentId);

  const [result] = await pool.query(query, values);

  // Si no se ha actualizado ningún cliente, lanzar un error.
  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido completar el envio');
    error.httpStatus = 500;
    error.code = 'COMPLETE_SHIPMENT_ERROR';
    throw error;
  }

  // Devolver el resultado.
  return { message: 'envio completado correctamente' };
};
