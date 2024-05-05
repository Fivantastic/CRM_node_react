import { getDBPool } from '../../../db/getPool.js';

export const selectUserVisitsByIdModel = async () => {
  const pool = getDBPool();

  // Obtener todas las visitas
  const result = await pool.query(`
    SELECT Visits.id_visit, Customers.name AS customer_name, Visits.visit_status, Visits.visit_date, Visits.observations, Visits.rating_visit, Visits.rating_comment
    FROM Visits
    LEFT JOIN Customers ON Visits.customer_id = Customers.id_customer
  `);

  return result[0];
};
