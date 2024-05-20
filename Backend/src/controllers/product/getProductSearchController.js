import { getProductSearchService } from "../../services/product/getProductSearchService.js";

export const getProductSearchController = async (req, res, next) => {
    try {
        //Recibimos la cadena completa desde la consulta
        const searchTerm = req.query.searchTerm;

        console.log('searchTerm', searchTerm);

        //Llamanos al servivio
        const response = await getProductSearchService(searchTerm);
        console.log('response', response);
        res.status(200).json({
            status: 'ok',
            message: 'lista Productos',
            data: response
        })
    } catch  (error) {
        next(error);
    }
}