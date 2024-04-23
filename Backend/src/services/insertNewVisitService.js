import { insertOrUpdateVisitModel } from "../models/ModulesService/visits/insertOrUpdateVisitModel.js";
import { selectAddressCustomerByIdModel } from "../models/customer/selectAdressCustomerByIdModel.js";
import { selectCustomerByIdModel } from "../models/customer/selectCustomerByIdModel.js";


export const insertNewVisitService = async (userId, id_customer, visit_date, observations) => {
    // Creamos una id para la visita.
    const visitId = crypto.randomUUID();
    
    // Obtenemos el cliente
    const customer = await selectCustomerByIdModel(id_customer);
    
    const { address_id } = customer;

    // Obtenemos la direccion del cliente.
    const address = await selectAddressCustomerByIdModel(address_id);

    // Insertamos la visita en la base de datos.
    await insertOrUpdateVisitModel(visitId, userId, id_customer, visit_date, observations);

    // Retornamos el cliente y la direccion.
    return { customer, address };
}