import { getDBPool } from '../../../db/getPool.js';
import { notFoundError } from '../../../services/error/errorService.js';

export const deleteSaleModel = async (id_sale) => {
  const pool = await getDBPool();

  // Verificar si existen deleveryNote en cancelado
  const deliveryNotes = await pool.query('SELECT * FROM DeliveryNotes WHERE sale_id = ?', [id_sale]);

  console.log(deliveryNotes)

 /*  if (deliveryNotes.delivery_status === 'cancelled') { */

    await pool.query('DELETE FROM Modules WHERE sale_id =?', [id_sale]);
    
    await pool.query('DELETE FROM Shipments WHERE deliveryNote_id IN (SELECT id_note FROM DeliveryNotes WHERE sale_id =?)', [id_sale]);
    
    await pool.query('DELETE FROM DeliveryNotes WHERE sale_id =?', [id_sale]);
    
    await pool.query('DELETE FROM Payments WHERE invoice_id IN (SELECT id_invoice FROM Invoices WHERE sale_id =?)', [id_sale]);
    
    await pool.query('DELETE FROM Invoices WHERE sale_id =?', [id_sale]);
    
    const result = await pool.query('DELETE FROM Sales WHERE id_sale =?', [id_sale]);

  
  notFoundError('La venta no ha sido cancelada');


  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido eliminar la venta.');
    error.code = 'DELETE_SALES_ERROR';
    throw error;
  }


  return { message: 'Venta eliminada correctamente' };
};
