import { getDBPool } from '../../../db/getPool.js';

export const selectVisitSearchModel = async (searchTerm) => {
  const pool = getDBPool();
  console.log(`Buscando en la base de datos con término: ${searchTerm}`);

  // Si searchTerm está definido, aplica el filtro de búsqueda

  const [rows] = await pool.query(
    `SELECT Visits.id_visit, Customers.name AS customer_name, Visits.visit_date, Visits.observations, Visits.rating_comment, Visits.visit_status, Visits.rating_visit
    FROM Visits
    LEFT JOIN Customers ON Visits.customer_id = Customers.id_customer
    WHERE Customers.name LIKE? OR Visits.rating_visit LIKE?`,
    [`%${searchTerm}%`, `%${searchTerm}%`]
  );
  console.log(`Resultados encontrados: ${rows.length}`);
  return rows;
};
