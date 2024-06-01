import { getDBPool } from "../../db/getPool.js";

export const selectUserSearchModel = async (search) => {
    try {
        const pool = getDBPool();
    
        const [rows] = await pool.query(
            "SELECT * FROM Users WHERE name LIKE? OR last_name LIKE?",
            [`%${search}%`, `%${search}%`]
        );
    
        return rows;
        
    } catch (error) {
        throw {
            statusCode: 500,
            code: 'GET_USER_LIST_SERVICE_ERROR',
            message: 'Error al obtener la lista de busquedas de usuarios desde el servicio',
          };
        
    }
}
