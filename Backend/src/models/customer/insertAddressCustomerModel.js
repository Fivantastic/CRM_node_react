import { getDBPool } from "../../db/getPool.js";

export const insertAddressCustomerModel = async (id_address) => {

    const pool = await getDBPool();

    const [result] = await pool.query(
        "INSERT INTO Addresses (id_address) VALUES (?)",
        [id_address]
    );

    if (result.affectedRows === 0) {
        const error = new Error("No se ha podido insertar la dirección");
        error.code = "INSERT_ADDRESS_ERROR";
        throw error;
    }

}