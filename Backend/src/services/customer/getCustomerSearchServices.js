import { selectCustomerSearchModel } from "../../models/customer/selectCustomerSearchModel.js";


export const getCustomerSearchService = async (search) => {
    // Buscamos en la base de datos el usuario.
    const customer = await selectCustomerSearchModel(search);
    return customer;
}