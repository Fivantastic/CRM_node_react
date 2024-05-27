import { getDBPool } from '../../../db/getPool.js';

export const deleteShipmentModel = async (shipmentId) => {
  const pool = await getDBPool();

  const [result] = await pool.query(
    'DELETE FROM Shipments WHERE id_shipment = ?',
    [shipmentId]
  );
  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido eliminar el envio');
    error.code = 'DELETE_SHIPMENT_ERROR';
    throw error;
  }
  return { message: 'Envio eliminado correctamente' };
};
