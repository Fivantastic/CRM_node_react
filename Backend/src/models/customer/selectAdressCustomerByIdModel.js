import { getDBPool } from "../../db/getPool.js";

export const selectAddressCustomerByIdModel = async (address_id) => {
    const pool = getDBPool();

    try {
        const [Addresses] = await pool.query(
            `SELECT * FROM Addresses WHERE id_address = ?`,
            [address_id]
        );

        return Addresses[0];
    } catch (error) {
        throw error;
    }
}