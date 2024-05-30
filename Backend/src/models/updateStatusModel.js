import { getDBPool } from '../db/getPool.js';

export const updateStatusModel = async (table, column_name, comparison_column, operation_status, id) => {
    // Lista blanca de nombres de tablas permitidos
    const allowedTables = ['Shipments', 'DeliveryNotes', 'Sales'];

    // Lista blanca de nombres de columnas permitidos
    const allowedColumns = [
        'operation_status', 'delivery_status', 'shipment_status', 
        'id_note', 'id_sale', 'id_shipment', 'active'
    ];

    // Validación del nombre de la tabla y las columnas
    if (!allowedTables.includes(table)) {
        throw new Error('Invalid table name');
    }
    if (!allowedColumns.includes(column_name) || !allowedColumns.includes(comparison_column)) {
        throw new Error('Invalid column name');
    }

    const pool = await getDBPool();
    const query = `UPDATE ${table} SET ${column_name} = ? WHERE ${comparison_column} = ?`;
    const [result] = await pool.query(query, [operation_status, id]);

    return result;
}
