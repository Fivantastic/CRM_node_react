import { getDBPool } from "../../../db/getPool.js";

export const selectProductByIdModel = async (saleProdut_id) => {
  const pool = await getDBPool();

  // Comprobar si existe un producto con el id proporcionado.
  const product = await pool.query(
    `SELECT * FROM SalesProducts WHERE id_saleProduct = ?`,
    [saleProdut_id]
  );
  console.log('selecciona el producto', product);
  return product[0];
};
