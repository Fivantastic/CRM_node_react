import { getDBPool } from '../../db/getPool.js';

export const getModuleVisitModel = async (searchTerm) => {
  const pool = getDBPool();
  if (searchTerm && searchTerm.trim() !== '') {
    // Si searchTerm está definido, aplica el filtro de búsqueda
    const result = await pool.query(
      `SELECT Users.name AS salesAgent, Users.last_name AS salesAgent_lastName,Customers.name AS customer, Customers.email AS customer_email, Customers.phone AS customer_phone, Customers.phone AS customer_phone, Addresses.address AS address, Addresses.number AS address_number, Addresses.floor AS address_floor ,Addresses.letter_number AS address_letter_number, Addresses.city AS address_city, Addresses.zip_code AS address_zip_code, Addresses.country AS address_country, Visits.visit_status, Visits.visit_date, Visits.observations, Visits. rating_visit, Visits.rating_comment, Visits.creation_at, Visits.update_at
       FROM Visits
       LEFT JOIN Users ON Visits.user_id = Users.id_user
       LEFT JOIN Customers ON Visits.customer_id = Customers.id_customer
       LEFT JOIN Addresses ON Visits.customer_id = Customers.id_customer
       WHERE Visits.visit_status LIKE ?`,
      [`%${searchTerm}%`]
    );
    if (!result || result.length === 0) {
      notFoundError('Visits');
    }
    return result[0];
  } else {
    // Si searchTerm no está definido o es una cadena vacía, devuelve todos los resultados
    const result = await pool.query(
      `SELECT Users.name AS salesAgent, Users.last_name AS salesAgent_lastName, Customers.name AS customer, Customers.email AS customer_email, Customers.phone AS customer_phone, Customers.phone AS customer_phone, Addresses.address AS address, Addresses.number AS address_number, Addresses.floor AS address_floor ,Addresses.letter_number AS address_letter_number, Addresses.city AS address_city, Addresses.zip_code AS address_zip_code, Addresses.country AS address_country, Visits.visit_status, Visits.visit_date, Visits.observations, Visits. rating_visit, Visits.rating_comment, Visits.creation_at, Visits.update_at
       FROM Visits
       LEFT JOIN Users ON Visits.user_id = Users.id_user
       LEFT JOIN Customers ON Visits.customer_id = Customers.id_customer
       LEFT JOIN Addresses ON Visits.customer_id = Customers.id_customer`
    );
    return result[0];
  }
};
