import { getUserListService } from "../../services/user/getUserListService.js";

export const getUserListController = async (req, res, next) => {
  try {
    const usersList = await getUserListService();

    res.status(200).send({
      status: 'ok',
      data: usersList,
    });
  } catch (error) {
    next({
      statusCode: error.statusCode || 500,
      code: error.code || 'GET_USER_LIST_ERROR',
      message: error.message || 'Error al obtener la lista de usuarios',
    });
  }
};