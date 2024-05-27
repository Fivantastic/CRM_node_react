import { getPaymentSearchService } from "../../../services/Modules/payments/getPaymentSearchService.js";

export const getPaymentSearchController = async (req, res, next) => {
    try {
        // Recibimos la cadena completa desde la consulta
        const searchTerm = req.query.searchTerm;

        // Llamamos al servicio
        const response = await getPaymentSearchService(searchTerm);

        res.status(200).json({
            status: 'ok',
            message: 'Users',
            data: response
        })
    } catch (error) {
        next(error);
    }
}
