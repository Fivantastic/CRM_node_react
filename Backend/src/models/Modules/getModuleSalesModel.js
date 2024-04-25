import { getDBPool } from '../../db/getPool.js';
import { notFoundError } from '../../services/error/errorService.js';

export const getModuleSalesModel = async (searchTerm) => {
  const pool = getDBPool();

  if (searchTerm && searchTerm.trim() !== '') {
    // Si searchTerm está definido, aplica el filtro de búsqueda
    const result = await pool.query(
      `SELECT * FROM Sales WHERE operation_status LIKE ?`,
      [`%${searchTerm}%`]
    );
    if (!result || result.length === 0) {
      notFoundError('Sales');
    }
    return result[0];
  } else {
    // Si searchTerm no está definido o es una cadena vacía, devuelve todos los resultados
    const result = await pool.query(`SELECT * FROM Sales`);
    return result[0];
  }
};
