import { getDBPool } from "../../db/getPool.js";

export const selectCustomerSearchModel = async (search) => {
    const pool = await getDBPool();

    const [rows] = await pool.query(
        `SELECT 
            Customers.id_customer, 
            Customers.ref_CT, 
            Customers.name, 
            Customers.last_name,
            Customers.email, 
            Customers.phone, 
            Customers.company_name, 
            Customers.NIF,
            Customers.active, 
            Addresses.address, 
            Addresses.number, 
            Addresses.floor, 
            Addresses.letter_number, 
            Addresses.city, 
            Addresses.zip_code, 
            Addresses.country
        FROM Customers 
        INNER JOIN Addresses ON Customers.address_id = Addresses.id_address 
        WHERE Customers.name LIKE ? OR Customers.email LIKE ? OR Customers.ref_CT LIKE ? OR Customers.company_name LIKE ?`,
        [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]
    );

    return rows;
}
