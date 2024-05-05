import { getDBPool } from '../../../db/getPool.js';

export const deleteModuleByIdVisitModel = async (id_module) => {
    const pool = getDBPool();
    const [result] = await pool.query(
        `DELETE FROM Modules 
        WHERE id_module = ?`,
        [id_module]
    );

    if (result.affectedRows === 0) {
        const error = new Error('No se ha podido eliminar la visita');
        error.code = 'DELETE_VISITS_ERROR';
        throw error;
    }
}
