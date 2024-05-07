import { getDBPool } from '../../../db/getPool.js';

export const deleteInvoiceModel = async (
  invoiceId,
  shipment_id,
  deliveryNote_id
) => {
  const pool = await getDBPool();

  // 1. Eliminar registros en Modules que tienen el invoice_id
  await pool.query('DELETE FROM Modules WHERE  invoice_id = ?', [invoiceId]);

  // 2. Eliminar registros en Shipments que tienen el invoice_id
  await pool.query('DELETE FROM Shipments WHERE id_shipment = ?', [
    shipment_id,
  ]);

  // 3. Eliminar registros en DeliveryNotes que tienen el invoice_id
  await pool.query('DELETE FROM DeliveryNotes WHERE id_note= ?', [
    deliveryNote_id,
  ]);

  // 4. Eliminar registros en Payments que tienen el invoice_id
  await pool.query('DELETE FROM Payments WHERE invoice_id = ?', [invoiceId]);

  // 5. Eliminar registros en Invoices que tienen el invoice_id
  const result = await pool.query('DELETE FROM Invoices WHERE id_invoice = ?', [
    invoiceId,
  ]);

  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido eliminar la factura');
    error.code = 'DELETE_INVOICE_ERROR';
    throw error;
  }

  return { message: 'Factura eliminada correctamente' };
};
