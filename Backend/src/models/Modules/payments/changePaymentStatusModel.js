import { getDBPool } from '../../../db/getPool.js';
import { notFoundError } from '../../../services/error/errorService.js';


export const changePaymentStatusModel = async (id_payment, status) => {
    const pool = await getDBPool();

    // Existe el pago?
    const [rows] = await pool.query('SELECT * FROM Payments WHERE id_payment= ?', [id_payment]);
    console.log(rows);
    if (rows.length === 0) throw notFoundError('Payment');
    
    // Actualizar el pago
    const [result] = await pool.query(`UPDATE Payments SET payment_status = ? WHERE id_payment = ?`, [status, id_payment]);

    if (result.affectedRows === 0) {
        const error = new Error('No se ha podido actualizar el pago.');
        error.httpStatus = 500;
        error.code = 'UPDATE_PAYMENT_ERROR';
        throw error;
      };
};
