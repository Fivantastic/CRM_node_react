import { getDBPool } from '../../../db/getPool.js';

export const updateShipmentModel = async (shipmentId, shipment_status) => {
  const pool = await getDBPool();


  const query = `UPDATE Shipments SET shipment_status = ? WHERE id_shipment = ?`;
  const values = [shipment_status, shipmentId];

  const [result] = await pool.query(query, values);

  // Si no se ha actualizado ningún envío, lanzar un error.
  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido actualizar el envío');
    error.httpStatus = 500;
    error.code = 'UPDATE_SHIPMENT_ERROR';
    throw error;
  }

  // Devolver el resultado.
  return { message: 'Envío actualizado correctamente' };
};
