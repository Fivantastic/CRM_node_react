import { selectCustomerByIdModel } from "../../../models/customer/selectCustomerByIdModel.js";
import { selectAddressCustomerByIdModel } from "../../../models/customer/selectAdressCustomerByIdModel.js";
import { invalidCredentials } from "../../error/errorService.js";
import { insertVisitModel } from "../../../models/Modules/visits/insertVisitModel.js";


export const insertNewVisitService = async (user_id, id_customer, visit_date, observations) => {
    // Creamos una id para la visita.
    const visitId = crypto.randomUUID();
    
    // Obtenemos el cliente
    const customer = await selectCustomerByIdModel(id_customer);

    // Verificamos si el cliente
    if (!customer) {
        invalidCredentials('El cliente no existe');
    }

    const{ address_id } = customer;
    
    // Obtenemos la direccion del cliente
    const address = await selectAddressCustomerByIdModel(address_id);

    // Verificamos si la direccion existe.
    if (!address.address) {
        invalidCredentials('El cliente no tiene asociada una direccion');
    }

    // Insertamos la visita en la base de datos.
    await insertVisitModel(visitId, user_id, id_customer, visit_date, observations);

    // Retornamos el cliente y la direccion.
    return { customer, address };
}