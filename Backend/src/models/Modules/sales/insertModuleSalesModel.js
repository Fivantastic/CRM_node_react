import { getDBPool } from '../../../db/getPool.js';

export const insertModuleSalesModel = async (moduleId, refModule, id_user, service_type, id_sale) => {
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
    addToUpdate('ref_MD', refModule);
    addToUpdate('agentUser_id', id_user);
    addToUpdate('service_type', service_type);
    addToUpdate('sale_id', id_sale);

    if (fieldsToUpdate.length === 0) return {}; 

    const fieldsString = fieldsToUpdate.join(', ');

    const query = `INSERT INTO Modules SET ${fieldsString}`;
    values.push(id_sale);

 
    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
        const error = new Error('No se ha podido insertar la visita');
        error.code = 'INSERT_VISIT_ERROR';
        throw error;
    }

}
