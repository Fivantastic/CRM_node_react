import { insertOrUpdateVisitModel } from "../models/ModulesService/visits/insertOrUpdateVisitModel.js";
import { invalidCredentials } from "./errorService.js";
import { selectCustomerByIdModel } from "../models/customer/selectCustomerByIdModel.js";
import { selectUserByIdModel } from "../models/user/selectUserByIdModel.js";


export const updateVisitService = async (visitId, id_user, id_customer, visit_date, observations) => {
    //Verifica si id_user existe
    const userData = await selectUserByIdModel(id_user);

    if(!userData) throw invalidCredentials('El usuario no existe');

    const userId = userData.id_user;
    
    //Verifica si id_customer existe
    const customerData = await selectCustomerByIdModel(id_customer);
    
    if(!customerData) throw invalidCredentials('El cliente no existe');
    
    const customerId = customerData.id_customer;
    
    await insertOrUpdateVisitModel(visitId, userId, customerId, visit_date, observations);

}