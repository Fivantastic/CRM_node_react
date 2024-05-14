import { getDBPool } from "../../db/getPool.js";

export const selectUserSearchModel = async (search) => {
    const pool = getDBPool();
    console.log(`Buscando en la base de datos con término: ${search}`); 
    const [rows] = await pool.query(
        "SELECT * FROM Users WHERE name LIKE? OR last_name LIKE?",
        [`%${search}%`, `%${search}%`]
    );
    console.log(`Resultados encontrados: ${rows.length}`); 
    return rows;
}
