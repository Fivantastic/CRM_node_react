import { getUserSearchService } from "../../services/user/getUserSearchService.js";

export const getUserSearchController = async (req, res, next) => {
    try {
        // Recibimos la cadena completa desde la consulta
        const searchTerm = req.query.searchTerm;

        // Llamamos al servicio
        const response = await getUserSearchService(searchTerm);
        console.log('response', response);
        res.status(200).json({
            status: 'ok',
            message: 'Users',
            data: response
        })
    } catch (error) {
        next(error);
    }
}
