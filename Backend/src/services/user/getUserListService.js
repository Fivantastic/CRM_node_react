import { getUserListModel } from "../../models/user/getUserListModal.js";

export const getUserListService = async () => {
  try {
    const users = await getUserListModel();
    return users;
  } catch (error) {
    throw {
      statusCode: 500,
      code: 'GET_USER_LIST_SERVICE_ERROR',
      message: 'Error al obtener la lista de usuarios desde el servicio',
    };
  }
};
