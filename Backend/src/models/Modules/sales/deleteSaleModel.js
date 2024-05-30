import { getDBPool } from '../../../db/getPool.js';

export const deleteSaleModel = async (id_sale) => {

  console.log('entro en borrar');
  const pool = await getDBPool();

  // Eliminar las entradas en Modules asociadas con sale_id
  await pool.query('DELETE FROM Modules WHERE sale_id = ?', [id_sale]);

  // Eliminar la entrada en Sales
  const [result] = await pool.query('DELETE FROM Sales WHERE id_sale = ?', [id_sale]);
  
  // Eliminar las entradas en SalesProducts asociadas con sale_id
  await pool.query('DELETE FROM SalesProducts WHERE id_saleProduct = (SELECT saleProduct_id FROM Sales WHERE id_sale = ?)', [id_sale]);

  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido eliminar la venta.');
    error.code = 'DELETE_SALES_ERROR';
    throw error;
  }

  return { message: 'Venta eliminada correctamente' };
};
