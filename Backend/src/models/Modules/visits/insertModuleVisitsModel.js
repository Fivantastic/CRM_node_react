import { getDBPool } from '../../../db/getPool.js';

export const insertModuleVisitsModel = async (moduleId, user_id, visitId) => {
    const pool = await getDBPool();

    const fieldsToUpdate = [];
    const values = [];

    const addToUpdate = (field, value) => {
        if (value !== undefined && value !== null) {
            fieldsToUpdate.push(`${field} = ?`);
            values.push(value);
        }

    };
    addToUpdate('id_module', moduleId);
    addToUpdate('agentUser_id', user_id);
    addToUpdate('visit_id', visitId);

    if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar, salir

    const fieldsString = fieldsToUpdate.join(', ');

    const query = `INSERT INTO Modules SET ${fieldsString}`;
    values.push(visitId);

 
    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
        const error = new Error('No se ha podido insertar la visita');
        error.code = 'INSERT_VISIT_ERROR';
        throw error;
    }

}
