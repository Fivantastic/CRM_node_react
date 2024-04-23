import { getDBPool } from "../../../db/getPool.js";

export const insertOrUpdateVisitModel = async (visitId, userId, customerId, visitDate, observations) => {
    const pool = await getDBPool();

    const fieldsToUpdate = [];
    const values = [];

    const addToUpdate = (field, value) => {
        if (value !== undefined && value !== null) {
            fieldsToUpdate.push(`${field} = ?`);
            values.push(value);
        }
    };

    addToUpdate('user_id', userId);
    addToUpdate('customer_id', customerId);
    addToUpdate('visit_date', visitDate);
    addToUpdate('observations', observations);

    if (fieldsToUpdate.length === 0) return {}; // No hay campos para actualizar, salir

    let query, result;

    // Verificar si ya existe una visita con el mismo id_visit
    const [existingVisits] = await pool.query('SELECT * FROM Visits WHERE id_visit = ?', [visitId]);

    if (existingVisits.length > 0) {
        // Si existe, actualizar la visita
        query = `UPDATE Visits SET ${fieldsToUpdate.join(', ')} WHERE id_visit = ?`;
        values.push(visitId);
        [result] = await pool.query(query, values);
    } else {
        // Si no existe, insertar una nueva visita
        query = `INSERT INTO Visits (id_visit, user_id, customer_id, visit_date, observations) VALUES (?, ?, ?, ?, ?)`;
        values.unshift(visitId); // Agregar el id_visit al principio del array
        [result] = await pool.query(query, values);
    }

    if (result.affectedRows === 0) {
        const error = new Error('No se ha podido insertar o actualizar la visita.');
        error.httpStatus = 500;
        error.code = 'INSERT_OR_UPDATE_VISIT_ERROR';
        throw error;
    }
}
