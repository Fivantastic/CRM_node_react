import { getDBPool } from '../../db/getPool.js';

export const selectCustomersListModel = async () => {
  const pool = getDBPool();

  // Obtener todos los clientes
  const result = await pool.query(`
    SELECT Customers.id_customer, Customers.name, Customers.email, Customers.phone, Customers.company_name, Customers.NIF, Addresses.address AS street, Addresses.number AS street_number, Addresses.floor AS floor, Addresses.letter_number AS letter_number, Addresses.city, Addresses.zip_code , Addresses.country
    FROM Customers
    INNER JOIN Addresses ON Customers.address_id = Addresses.id_address ORDER BY Customers.create_at DESC`);

  return result[0];
};
