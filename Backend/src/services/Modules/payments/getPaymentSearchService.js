import { selectPaymentSearchModel } from "../../../models/Modules/payments/selectPaymentSearchModel.js";


export const getPaymentSearchService = async (search) => {
    // Buscamos en la base de datos el usuario.
    const user = await selectPaymentSearchModel(search);

    return user;
}