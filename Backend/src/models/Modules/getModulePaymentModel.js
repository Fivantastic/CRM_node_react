import { getDBPool } from '../../db/getPool.js';

export const getModulePaymentModel = async (searchTerm) => {
  const pool = getDBPool();

  if (searchTerm && searchTerm.trim() !== '') {
    // Si searchTerm está definido, aplica el filtro de búsqueda
    const result = await pool.query(
      `SELECT * FROM Payments WHERE payment_status LIKE ?`,
      [`%${searchTerm}%`]
    );
    if (!result || result.length === 0) {
      notFoundError('Payments');
    }
    return result[0];
  } else {
    // Si searchTerm no está definido o es una cadena vacía, devuelve todos los resultados
    const result = await pool.query(`SELECT * FROM Payments`);
    return result[0];
  }
};
