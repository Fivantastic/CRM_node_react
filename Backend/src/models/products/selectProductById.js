import { getDBPool } from "../../db/getPool.js";

export const selectProductById = async (id_product) => {
  const pool = await getDBPool();

  // Comprobar si existe un producto con el id proporcionado.
  const [product] = await pool.query(
    `SELECT * FROM Products WHERE id_product = ?`,
    [id_product]
  );

  return product[0];
};
