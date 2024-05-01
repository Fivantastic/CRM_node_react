import { getDBPool } from '../../../db/getPool.js';

export const deleteVisitModel = async (visitId) => {
    const pool = getDBPool();
    const [result] = await pool.query(
        `DELETE FROM Visits 
        WHERE id_visit = ?`,
        [visitId]
    );

    if (result.affectedRows === 0) {
        const error = new Error('No se ha podido eliminar la visita');
        error.code = 'DELETE_VISITS_ERROR';
        throw error;
    }

    return { message: 'Visita eliminada correctamente' };
}
