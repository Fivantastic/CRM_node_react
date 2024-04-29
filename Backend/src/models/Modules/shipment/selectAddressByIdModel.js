import { getDBPool } from '../../../db/getPool.js';

export const selectAddressByIdModel = async (address_id) => {
  const pool = await getDBPool();

  // Comprobar si existe un cliente con el id proporcionado.
  const [address] = await pool.query(
    `SELECT * FROM Addresses WHERE id_address = ?`,
    [address_id]
  );

  return address[0];
};
