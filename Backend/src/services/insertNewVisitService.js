import { insertVisitModel } from "../models/ModulesService/visits/insertVisitModel.js";
import { selectAddressCustomerByIdModel } from "../models/customer/selectAdressCustomerByIdModel.js";
import { selectCustomerByIdModel } from "../models/customer/selectCustomerByIdModel.js";
import { invalidCredentials } from "./errorService.js";


export const insertNewVisitService = async (user_id, id_customer, visit_date, observations) => {
    // Creamos una id para la visita.
    const visitId = crypto.randomUUID();
    
    // Obtenemos el cliente
    const customer = await selectCustomerByIdModel(id_customer);

    // Verificamos si el cliente
    if (!customer) throw invalidCredentials('El cliente no existe');

    const{ address_id } = customer;
    
    // Obtenemos la direccion del cliente
    const address = await selectAddressCustomerByIdModel(address_id);

    // Verificamos si la direccion existe.
    if (!address.address) throw invalidCredentials('El cliente no tiene asociada una direccion');

    // Insertamos la visita en la base de datos.
    await insertVisitModel(visitId, user_id, id_customer, visit_date, observations);

    // Retornamos el cliente y la direccion.
    return { customer, address };
}