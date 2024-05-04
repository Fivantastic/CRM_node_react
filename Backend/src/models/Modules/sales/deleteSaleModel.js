import { getDBPool } from '../../../db/getPool.js';

export const deleteSaleModel = async (id_sale) => {
  const pool = await getDBPool();

  // 1. Eliminar registros en Modules que dependen de Shipments
  await pool.query(
    'DELETE FROM Modules WHERE shipment_id IN (SELECT id_shipment FROM Shipments WHERE deliveryNote_id IN (SELECT id_note FROM DeliveryNotes WHERE sale_id = ?))',
    [id_sale]
  );

  // 2. Eliminar registros en Shipments que dependen de DeliveryNotes
  await pool.query(
    'DELETE FROM Shipments WHERE deliveryNote_id IN (SELECT id_note FROM DeliveryNotes WHERE sale_id = ?)',
    [id_sale]
  );

  // 3. Eliminar registros en DeliveryNotes
  await pool.query('DELETE FROM DeliveryNotes WHERE sale_id = ?', [id_sale]);

  // 4. Eliminar registros en Payments que dependen de Invoices
  await pool.query(
    'DELETE FROM Payments WHERE invoice_id IN (SELECT id_invoice FROM Invoices WHERE sale_id = ?)',
    [id_sale]
  );

  // 5. Eliminar registros en Invoices
  await pool.query('DELETE FROM Invoices WHERE sale_id = ?', [id_sale]);

  // 6. Finalmente, eliminar la venta
  const result = await pool.query('DELETE FROM Sales WHERE id_sale = ?', [
    id_sale,
  ]);

  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido eliminar la venta.');
    error.code = 'DELETE_SALES_ERROR';
    throw error;
  }

  return { message: 'Venta eliminada correctamente' };
};
