import { getDBPool } from "../../db/getPool.js";

export const updateNewRegistrationCodeModel = async (id_user, new_registration_code) => {
    const dbPool = getDBPool();
    const query = `UPDATE Users SET registration_code = ? WHERE id_user = ?`;
    const values = [new_registration_code, id_user];
    const [rows] = await dbPool.query(query, values);
    return rows;
}