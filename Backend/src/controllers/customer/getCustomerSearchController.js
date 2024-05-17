import { getCustomerSearchService } from "../../services/customer/getCustomerSearchServices.js";



export const getCustomerSearchController = async (req, res, next) => {
    try {
        // Recibimos la cadena completa desde la consulta
        const searchTerm = req.query.searchTerm;

        const customers = await getCustomerSearchService(searchTerm);
        res.status(200).send({
            status: 'ok',
            data: customers
        });
    } catch (error) {
        next(error);
    }
}