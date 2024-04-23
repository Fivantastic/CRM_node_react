import { getDBPool } from "../../db/getPool.js";

export const selectAddressCustomerByIdModel = async (id_address) => {
    const pool = getDBPool();

    try {
        const [Addresses] = await pool.query(
            `SELECT * FROM Addresses WHERE id_address = ?`,
            [id_address]
        );
        return Addresses[0];
    } catch (error) {
        throw error;
    }
}