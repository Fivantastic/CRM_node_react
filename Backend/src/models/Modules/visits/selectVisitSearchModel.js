import { getDBPool } from '../../../db/getPool.js';

export const selectVisitSearchModel = async (searchTerm) => {
  const pool = getDBPool();
  console.log(`Buscando en la base de datos con término: ${searchTerm}`);

  // Si searchTerm está definido, aplica el filtro de búsqueda

  const [rows] = await pool.query(
    `SELECT Visits.id_visit, 
    Visits.ref_VT, 
    Customers.name AS customer_name, 
    Customers.last_name AS customer_last_name, 
    Customers.email AS customer_email,
    Customers.phone AS customer_phone,
    Visits.visit_status, 
    Visits.visit_date, 
    Visits.observations, 
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
    WHERE Customers.name LIKE? OR Visits.ref_VT LIKE?`,
    [`%${searchTerm}%`, `%${searchTerm}%`]
  );
  console.log(`Resultados encontrados: ${rows.length}`);
  return rows;
};
