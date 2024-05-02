import { getDBPool } from '../../db/getPool.js'; 

export const updatePasswordModel = async (id_user, hashedPassword) => {
  const pool = getDBPool(); 
  const query = `
    UPDATE Users
    SET password = ?
    WHERE id_user = ?
  `;

  await pool.execute(query, [hashedPassword, id_user]);
  
  return { message: 'Contraseña actualizada correctamente' };
};