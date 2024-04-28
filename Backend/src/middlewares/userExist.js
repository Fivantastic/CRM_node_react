import { selectUserByIdModel } from '../models/user/selectUserByIdModel.js';
import { notFoundError } from '../services/error/errorService.js';

export const userExist = async (req, res, next) => {
  try {
    // Obtener el id del usuario. Ya sea desde el token o desde los parámetros de la URL.
    const id_user = req.user?.id_user || req.params.id_user;

    // Comprobar si existe un usuario con el id proporcionado.
    const user = await selectUserByIdModel(id_user);

    // Si no se encuentra el usuario, lanzar un error.
    if (!user) {
      notFoundError('usuario');
    }

    // Pasar el control al siguiente middleware.
    next();
  } catch (error) {
    next(error);
  }
};
