import { selectUserByIdModel } from "../../models/user/selectUserByIdModel.js";

export const getProfileUserService = async (id_user) => {
  try {
    const user = await selectUserByIdModel(id_user);
    return user;
  } catch (error) {
    throw {
      statusCode: 500,
      code: 'GET_PROFILE_USER_SERVICE_ERROR',
      message: 'Error al obtener el perfil del usuario desde el servicio',
    };
  }
};