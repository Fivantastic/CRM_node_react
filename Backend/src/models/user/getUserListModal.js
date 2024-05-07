import { getDBPool } from '../../db/getPool.js';

export const getUserListModal = async () => {
  const pool = getDBPool();

  // Obtener todos los usuarios con sus direcciones asociadas
  const result = await pool.query(`
    SELECT Users.id_user, Users.name, Users.last_name, Users.email, Users.phone,
           Users.role, Users.active, Users.avatar, Users.biography,
           Addresses.address, Addresses.number, Addresses.floor, Addresses.letter_number,
           Addresses.city, Addresses.zip_code, Addresses.country
    FROM Users
    LEFT JOIN Addresses ON Users.address_id = Addresses.id_address
  `);

  return result[0];
};
