import { getDBPool } from '../../db/getPool.js';

export const getUserListModel = async () => {
  try {
    const pool = await getDBPool();
    
    // Obtener todos los usuarios con sus direcciones asociadas
    const [result] = await pool.query(`
      SELECT Users.id_user, Users.ref_US, Users.name, Users.last_name, Users.email, Users.phone,
             Users.role, Users.active, Users.avatar, Users.biography,
             Addresses.address, Addresses.number, Addresses.floor, Addresses.letter_number,
             Addresses.city, Addresses.zip_code, Addresses.country
      FROM Users
      LEFT JOIN Addresses ON Users.address_id = Addresses.id_address
      ORDER BY Users.name, Users.last_name ASC
    `);
  
    return result;
  } catch (error) {
    throw {
      statusCode: 500,
      code: 'GET_USER_LIST_MODEL_ERROR',
      message: 'Error al obtener la lista de usuarios desde el modelo',
    };
  }
};