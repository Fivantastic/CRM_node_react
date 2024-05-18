import { getInvoiceSearchService } from "../../../services/Modules/invoices/getInvoiceSearchService.js";

export const getInvoiceSearchController = async (req, res, next) => {
    try {
        // Recibimos la cadena completa desde la consulta
        const searchTerm = req.query.searchTerm;

        // Llamamos al servicio
        const response = await getInvoiceSearchService(searchTerm);
        console.log('response', response);
        res.status(200).json({
            status: 'ok',
            message: 'Invoices',
            data: response
        })
    } catch (error) {
        next(error);
    }
}
