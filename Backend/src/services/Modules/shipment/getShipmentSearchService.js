import { selectShipmentSearchModel } from "../../../models/Modules/shipment/selectShipmentSearchModel.js";

// Función para buscar envíos
export const getShipmentSearchService = async (search) => {
    // Llamamos al modelo para buscar envíos
    const shipments = await selectShipmentSearchModel(search);

    return shipments;
}

