import { getDBPool } from '../../db/getPool.js';

// Extraemos si el usuario tiene asignados modulos, y devolverlos el resultado si hay, y si no encuentra nada delvemos un array vacio
export const selectModulesByUserIdModel = async (userId) => {
    const pool = await getDBPool();
    const [modules] = await pool.query(
        `SELECT * FROM Modules 
        WHERE agentUser_id = ? OR deliveryUser_id = ?`,
        [userId, userId]
    );
    
    return modules;
}