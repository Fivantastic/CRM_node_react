import { getDBPool } from "../../db/getPool.js";

export const selectProductListModel = async () => {

    const pool = getDBPool();

    const resoult = await pool.query(

        "SELECT * FROM Products"
    )

    return resoult[0]

};
