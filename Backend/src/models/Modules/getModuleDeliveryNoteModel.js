import { getDBPool } from '../../db/getPool.js';

export const getModuleDeliveryNoteModel = async (searchTerm) => {
  const pool = getDBPool();

  // Obtener el detalle del servicio
  if (searchTerm && searchTerm.trim() !== '') {
    // Si searchTerm está definido, aplica el filtro de búsqueda
    const result = await pool.query(
      `SELECT * FROM DeliveryNotes WHERE delivery_status LIKE ?`,
      [`%${searchTerm}%`]
    );
    if (!result || result.length === 0) {
      notFoundError('Sales');
    }
    return result[0];
  } else {
    // Si searchTerm no está definido o es una cadena vacía, devuelve todos los resultados
    const result = await pool.query(`SELECT * FROM DeliveryNotes`);
    return result[0];
  }
};
