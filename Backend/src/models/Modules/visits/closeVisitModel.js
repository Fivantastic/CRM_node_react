import { getDBPool } from "../../../db/getPool.js";

export const closeVisitModel = async (visitId, close_visit) => {
    const pool = await getDBPool();
    const [rows] = await pool.query(
        "UPDATE Visits SET visit_status = ? WHERE id_visit = ?",
        [close_visit, visitId]
    );

    if (rows.affectedRows === 0) {
        const error = new Error("No se ha podido cerrar la visita");
        error.code = "STATUS_VISIT_ERROR";
        throw error;
    }
}