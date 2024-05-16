import { selectDeliveryNoteSearchModel } from "../../../models/deliveryNote/selectDeliveryNoteSearchModel.js";


export const getDeliveryNoteSearchService = async (search) => {
    // Buscamos en la base de datos los albaranes.
    const deliveryNotes = await selectDeliveryNoteSearchModel(search);

    return deliveryNotes;
}
