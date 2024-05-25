import { getDBPool } from "../../../db/getPool.js";
import { notFoundError } from "../../../services/error/errorService.js";

export const selectProductIsSaleProductModel = async (saleProduct_id) => {
    const pool = getDBPool();
  
    const [result] = await pool.query(`SELECT * FROM SalesProducts WHERE id_saleProduct = ?`, [
        saleProduct_id,
    ]);
    /* console.log("selectProductIsSaleProductModel",result); */
  
    if (!result || result.length === 0) {
      notFoundError('SalesProducts');
    }
  
    return result[0];
  };
  