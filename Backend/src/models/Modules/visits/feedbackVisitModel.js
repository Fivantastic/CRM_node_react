import { getDBPool } from "../../../db/getPool.js";
import { success } from "../../../utils/success.js";

export const feedbackVisitModel = async (visitId, rating_visit, comment_visit) => {
    const pool = await getDBPool();

    //insertamos el rating y comentario en la base de datos del la id de la visita
    const [result] = await pool.query(
        "UPDATE Visits SET rating_visit = ?, rating_comment = ? WHERE id_visit = ?",
        [rating_visit, comment_visit, visitId]
    );
    if (result.affectedRows === 0) {
        const error = new Error("No se ha podido insertar el feedback de la visita");   
        error.code = "FEEDBACK_VISIT_ERROR";
        throw error;
    }

    return { message: 'Valoración de la visita insertado correctamente' };
}