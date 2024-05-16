import { getDBPool } from '../../../db/getPool.js';

export const insertVisitModel = async (visitId, ref, user_id, customerId, visitDate, observations) => {
    const pool = await getDBPool();

    const fieldsToUpdate = [];
    const values = [];

    const addToUpdate = (field, value) => {
        if (value !== undefined && value !== null) {
            fieldsToUpdate.push(`${field} = ?`);
            values.push(value);
        }

    };
    addToUpdate('id_visit', visitId);
    addToUpdate('ref_VT', ref);
    addToUpdate('user_id', user_id);
    addToUpdate('customer_id', customerId);
    addToUpdate('visit_date', visitDate);
    addToUpdate('observations', observations);

    if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar, salir

    const query = `INSERT INTO Visits (id_visit, ref_VT, user_id, customer_id, visit_date, observations) VALUES (?, ?, ?, ?, ?, ?)`;
    values.push(user_id);

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
        const error = new Error('No se ha podido insertar la visita');
        error.code = 'INSERT_VISIT_ERROR';
        throw error;
    }

}
