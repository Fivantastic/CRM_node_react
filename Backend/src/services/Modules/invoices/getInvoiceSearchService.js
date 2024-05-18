import { selectInvoiceSearchModel } from "../../../models/Modules/invoices/selectInvoiceSearchModel.js";


export const getInvoiceSearchService = async (search) => {
    // Buscamos en la base de datos el usuario.
    const user = await selectInvoiceSearchModel(search);

    return user;
}