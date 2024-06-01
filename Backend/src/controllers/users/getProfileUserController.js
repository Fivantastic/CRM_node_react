import { getProfileUserService } from "../../services/user/getProfileUserService.js";

export const getProfileUserController = async (req, res, next) => {
    try {
      const id_user = req.user.id_user;
      const user = await getProfileUserService(id_user);
  
      res.status(200).send({
        status: 'ok',
        data: user,
      });
    } catch (error) {
      next({
        statusCode: error.statusCode || 500,
        code: error.code || 'GET_PROFILE_USER_ERROR',
        message: error.message || 'Error al obtener el perfil del usuario',
      });
    }
  };