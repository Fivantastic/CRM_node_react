import { getDBPool } from '../../../db/getPool.js';

export const selectUserVisitsByIdModel = async () => {
  const pool = getDBPool();

  // Obtener todas las visitas junto con la información del cliente y la dirección
  const result = await pool.query(`
    SELECT 
      Visits.id_visit, 
      Visits.ref_VT, 
      Customers.name AS customer_name, 
      Customers.last_name AS customer_last_name, 
      Customers.email AS customer_email,
      Customers.phone AS customer_phone,
      Visits.visit_status, 
      Visits.visit_date, 
      Visits.observations, 
      Visits.rating_visit, 
      Visits.rating_comment,
      Addresses.address,
      Addresses.number,
      Addresses.floor,
      Addresses.letter_number,
      Addresses.city,
      Addresses.zip_code,
      Addresses.country
    FROM Visits
    LEFT JOIN Customers ON Visits.customer_id = Customers.id_customer
    LEFT JOIN Addresses ON Customers.address_id = Addresses.id_address
  `);

  return result[0];
};
