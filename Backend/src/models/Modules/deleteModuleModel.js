import { getDBPool } from '../../db/getPool.js';

export const deleteModuleModel = async (moduleId) => {
  const pool = await getDBPool();

  // elimino del las tablas todos los pagos relacionados
  const [result] = await pool.query('DELETE FROM Modules WHERE id_module = ?', [
    moduleId,
  ]);

  if (result.affectedRows === 0) {
    const error = new Error('No se ha podido eliminar el modulo');
    error.code = 'DELETE_MODULE_ERROR';
    throw error;
  }
  return { message: 'Modulo eliminado correctamente' };
};
