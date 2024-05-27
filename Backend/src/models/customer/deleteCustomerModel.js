import { getDBPool } from '../../db/getPool.js';

export const deleteCustomerModel = async (id_customer, address_id) => {
  const pool = await getDBPool();

  const [result] = await pool.query(
    'DELETE FROM Customers WHERE id_customer = ?',
    [id_customer]
  );
  await pool.query('DELETE FROM Addresses WHERE id_address = ?', [address_id]);

  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido eliminar el cliente');
    error.code = 'DELETE_CUSTOMER_ERROR';
    throw error;
  }
  return { message: 'Cliente eliminado correctamente' };
};
