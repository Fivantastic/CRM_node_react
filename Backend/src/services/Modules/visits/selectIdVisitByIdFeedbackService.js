import { getDBPool } from "../../../db/getPool.js";

export const selectIdVisitByIdFeedbackService = async (ref_VT) => {
    const pool = getDBPool();
  
    const [result] = await pool.query(`SELECT * FROM Visits WHERE ref_VT = ?`, [
        ref_VT,
    ]);
  
    return result[0];
  };
  