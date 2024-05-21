import { getDBPool } from '../../../db/getPool.js';

export const insertShipmentModel = async ({ shipmentId, ref, customer_id, address_id, deliveryNote_id, shipment_status, additional_notes }) => {
  const pool = getDBPool();

  try {
    await pool.query('START TRANSACTION');

    // Insertar los datos del envío en la tabla Shipments
    await pool.query(
      `INSERT INTO Shipments (id_shipment, ref_SH, customer_id, address_id, deliveryNote_id, shipment_status, additional_notes) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [shipmentId, ref, customer_id, address_id, deliveryNote_id, shipment_status, additional_notes]
    );

    // Confirmar todas las inserciones como una transacción única
    await pool.query('COMMIT');

    return { message: 'Shipment successfully inserted into database.' };
  } catch (error) {
    // Asegurarse de revertir la transacción en caso de error
    await pool.query('ROLLBACK');
    throw new Error(`Error during shipment insertion: ${error.message}`);
  }
};
