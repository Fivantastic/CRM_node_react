import { getDBPool } from "../../db/getPool.js";

export const deleteUserModel = async (id_user) => {
    const pool = await getDBPool();
    const [result] = await pool.query(
        `DELETE FROM Users WHERE id_user = ?`,
        [id_user]
    );
    if (result.affectedRows === 0) {
        const error = new Error("No se ha podido eliminar el usuario");
        error.code = "DELETE_USER_ERROR";
        throw error;
    }
}