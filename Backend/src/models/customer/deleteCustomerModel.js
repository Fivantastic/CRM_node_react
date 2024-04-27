import { getDBPool } from '../../db/getPool.js';

export const deleteCustomerModel = async (id_customer) => {

    const pool = await getDBPool();

    const [result] = await pool.query('DELETE FROM Customers WHERE id_customer = ?', [id_customer]);
    if (result.affectedRows === 0) {
        const error = new Error('No se ha podido eliminar el cliente');
        error.code = 'DELETE_CUSTOMER_ERROR';
        throw error;
    }
    return { message: 'Cliente eliminado correctamente' };
}