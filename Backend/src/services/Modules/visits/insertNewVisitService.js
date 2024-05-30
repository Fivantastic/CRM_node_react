import { selectCustomerByIdModel } from "../../../models/customer/selectCustomerByIdModel.js";
import { selectAddressCustomerByIdModel } from "../../../models/customer/selectAdressCustomerByIdModel.js";
import { invalidCredentials } from "../../error/errorService.js";
import { insertVisitModel } from "../../../models/Modules/visits/insertVisitModel.js";
import { insertModuleVisitsModel } from "../../../models/Modules/visits/insertModuleVisitsModel.js";
import { generateReference5DigitsFromRef } from "../../../utils/generateReference5Digits.js";
import { getMaxReference5Digits } from "../../../models/getMaxReference.js";


export const insertNewVisitService = async (user_id, id_customer, visit_date, observations) => {
    // Creamos una id para la visita.
    const visitId = crypto.randomUUID();

    // Creamos un id para el modulo
    const moduleId = crypto.randomUUID();

    // Obtenemos la referencia máxima de la tabla Visits
    const maxRef = await getMaxReference5Digits('Visits', 'ref_VT');

    // Generamos la nueva referencia de Visits
    const ref = generateReference5DigitsFromRef('VT', maxRef);
    
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
    await insertVisitModel(visitId, ref, user_id, id_customer, visit_date, observations);

    // Obtenemos la referencia máxima de la tabla Modules
    const maxRefModule = await getMaxReference5Digits('Modules', 'ref_MD') || 'MD-AA00000';

    // Generamos la nueva referencia de Modules
    const refModule = generateReference5DigitsFromRef('MD', maxRefModule);

    const service_type = 'visit';

    
    // Insertamos el modulo en la base de datos.
    await insertModuleVisitsModel(moduleId, refModule, user_id, service_type, visitId)

    // Retornamos el cliente y la direccion.
    return { customer, address };
}