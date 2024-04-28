import { getDBPool } from '../../db/getPool.js';

export const updateUserAvatarModel = async (userId, avatarName) => {
  const pool = await getDBPool();

  const [result] = await pool.query(
    `UPDATE Users SET avatar = ? WHERE id_user = ?`,
    [avatarName, userId]
  );

  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido actualizar el avatar');
    error.httpStatus = 500;
    error.code = 'UPDATE_USER_AVATAR_ERROR';
    throw error;
  }

  return result;
};
