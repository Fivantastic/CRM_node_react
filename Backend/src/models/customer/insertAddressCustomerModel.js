import { getDBPool } from "../../db/getPool.js";

export const insertAddressCustomerModel = async (
    id_address,
    address,  
    number,
    floor,
    letter_number,
    city,
    zip_code,
    country) => {

    const pool = await getDBPool();

    const result = await pool.query(
        `INSERT INTO Addresses (id_address, address, number, floor, letter_number, city, zip_code, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id_address, address, number, floor, letter_number, city, zip_code, country]
    );

    if (result.affectedRows === 0) {
        const error = new Error("No se ha podido insertar la dirección");
        error.code = "INSERT_ADDRESS_ERROR";
        throw error;
    }

}