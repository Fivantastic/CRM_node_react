import { getDBPool } from '../../db/getPool.js'; 

export const updatePasswordModel = async (id_user, hashedPassword) => {
  const pool = getDBPool(); 
  const query = `
    UPDATE Users
    SET password = ?
    WHERE id_user = ?
  `;
  
  try {
    const [result] = await pool.execute(query, [hashedPassword, id_user]);
    console.log(`Actualizando contraseña: ${JSON.stringify(result)}`);
    return { message: 'Contraseña actualizada correctamente' };
  } catch (error) {
    console.error(`Error al actualizar contraseña: ${error.message}`);
    throw error;
  }
};
