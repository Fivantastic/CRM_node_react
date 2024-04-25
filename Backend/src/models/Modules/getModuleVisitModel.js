import { getDBPool } from '../../db/getPool.js';

export const getModuleVisitModel = async (searchTerm) => {
  const pool = getDBPool();
  if (searchTerm && searchTerm.trim() !== '') {
    // Si searchTerm está definido, aplica el filtro de búsqueda
    const result = await pool.query(
      `SELECT * FROM Visits WHERE visit_status LIKE ? `,
      [`%${searchTerm}%`]
    );
    if (!result || result.length === 0) {
      notFoundError('Sales');
    }
    return result[0];
  } else {
    // Si searchTerm no está definido o es una cadena vacía, devuelve todos los resultados
    const result = await pool.query(`SELECT * FROM Visits`);
    return result[0];
  }
};
