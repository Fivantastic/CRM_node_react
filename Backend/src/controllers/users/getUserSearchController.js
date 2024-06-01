import { getUserSearchService } from "../../services/user/getUserSearchService.js";

export const getUserSearchController = async (req, res, next) => {
    try {
        // Recibimos la cadena completa desde la consulta
        const searchTerm = req.query.searchTerm;

        // Llamamos al servicio
        const response = await getUserSearchService(searchTerm);

        res.status(200).json({
            status: 'ok',
            message: 'Users',
            data: response
        })
    } catch (error) {
        next({
            statusCode: error.statusCode || 500,
            code: error.code || 'GET_USER_LIST_ERROR',
            message: error.message || 'Error al obtener la lista de usuarios con la busqueda',
          });
    }
}
