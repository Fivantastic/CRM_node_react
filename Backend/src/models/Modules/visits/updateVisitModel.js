import { getDBPool } from "../../../db/getPool.js";

export const updateVisitModel = async (visitId, id_user, customer_Id, visitDate, observations,) => {
    const pool = await getDBPool();

    const fieldsToUpdate = [];
    const values = [];

    const addToUpdate = (field, value) => {
        if (value !== undefined && value !== null) {
            fieldsToUpdate.push(`${field} = ?`);
            values.push(value);
        }
    };

    addToUpdate('user_id', id_user);
    addToUpdate('customer_id', customer_Id);
    addToUpdate('visit_date', visitDate);
    addToUpdate('observations', observations);

    if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar, salir

    const query = `UPDATE Visits SET ${fieldsToUpdate.join(', ')} WHERE id_visit = ?`;
    values.push(visitId);   

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
        const error = new Error('No se ha podido actualizar la visita');
        error.code = 'UPDATE_VISIT_ERROR';
        throw error;
    }

    return result;
}
