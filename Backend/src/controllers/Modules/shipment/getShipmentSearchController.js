import { getShipmentSearchService } from "../../../services/Modules/shipment/getShipmentSearchService.js";

// Controlador para buscar envíos
export const getShipmentSearchController = async (req, res, next) => {
    try {
        // Recibimos la cadena de búsqueda desde la consulta
        const searchTerm = req.query.searchTerm;

        // Llamamos al servicio para buscar envíos
        const response = await getShipmentSearchService(searchTerm);
        
        // Devolvemos la respuesta
        res.status(200).json({
            status: 'ok',
            message: 'Shipments',
            data: response
        });
    } catch (error) {
        next(error);
    }
}

