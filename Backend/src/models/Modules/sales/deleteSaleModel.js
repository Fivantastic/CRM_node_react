import { getDBPool } from '../../../db/getPool.js';

export const deleteSaleModel = async (id_sale, shipment_id, payment_id) => {
  const pool = await getDBPool();

  // 1. Eliminar registros en Modules que tienen el sale_id
  await pool.query('DELETE FROM Modules WHERE sale_id = ?', [id_sale]);

  // 2. Eliminar registros en Shipments que tienen el sale_id
  await pool.query('DELETE FROM Shipments WHERE id_shipment = ?', [shipment_id]);

  // 3. Eliminar registros en DeliveryNotes que tienen el sale_id
  await pool.query('DELETE FROM DeliveryNotes WHERE sale_id = ?', [id_sale]);

  // 4. Eliminar registros en Payments que tienen el sale_id
  await pool.query('DELETE FROM Payments WHERE id_payment = ?', [payment_id]);

  // 5. Eliminar registros en Invoices que tienen el sale_id
  await pool.query('DELETE FROM Invoices WHERE sale_id = ?', [id_sale]);

  // 6. Eliminar la venta de la tabla Sales usando el id_sale
  const result = await pool.query('DELETE FROM Sales WHERE id_sale = ?', [id_sale]);

  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido eliminar la venta.');
    error.code = 'DELETE_SALES_ERROR';
    throw error;
  }

  return { message: 'Venta eliminada correctamente' };
};






// import { getDBPool } from '../../../db/getPool.js';

// export const deleteSaleModel = async (id_sale) => {
//   const pool = await getDBPool();

//   // 1. Eliminar registros en Modules que dependen de Shipments
//   await pool.query(
//     'DELETE FROM Modules WHERE shipment_id IN (SELECT id_shipment FROM Shipments WHERE deliveryNote_id IN (SELECT id_note FROM DeliveryNotes WHERE sale_id = ?))',
//     [id_sale]
//   );

//   // 2. Eliminar registros en Shipments que dependen de DeliveryNotes
//   await pool.query(
//     'DELETE FROM Shipments WHERE deliveryNote_id IN (SELECT id_note FROM DeliveryNotes WHERE sale_id = ?)',
//     [id_sale]
//   );

//   // 3. Eliminar registros en DeliveryNotes
//   await pool.query('DELETE FROM DeliveryNotes WHERE sale_id = ?', [id_sale]);

//   // 4. Eliminar registros en Payments que dependen de Invoices
//   await pool.query(
//     'DELETE FROM Payments WHERE invoice_id IN (SELECT id_invoice FROM Invoices WHERE sale_id = ?)',
//     [id_sale]
//   );

//   // 5. Eliminar registros en Invoices
//   await pool.query('DELETE FROM Invoices WHERE sale_id = ?', [id_sale]);

//   // 6. Finalmente, eliminar la venta
//   const result = await pool.query('DELETE FROM Sales WHERE id_sale = ?', [
//     id_sale,
//   ]);

//   if (result.affectedRows === 0) {
//     const error = new Error('No se ha podido eliminar la venta.');
//     error.code = 'DELETE_SALES_ERROR';
//     throw error;
//   }

//   return { message: 'Venta eliminada correctamente' };
// };
