// updateVisitService.js

import { insertOrUpdateVisitModel } from "../models/ModulesService/visits/insertOrUpdateVisitModel.js";
import { invalidCredentials } from "./errorService.js";
import { selectCustomerByIdModel } from "../models/customer/selectCustomerByIdModel.js";
import { selectUserByIdModel } from "../models/user/selectUserByIdModel.js";
import { getVisitData } from "../models/ModulesService/visits/getVisitData.js";

export const updateVisitService = async (visitId, id_user, id_customer, visit_date, observations) => {
    // Verifica si id_user existe
    const userData = await selectUserByIdModel(id_user);
    if (!userData) throw invalidCredentials('El usuario no existe');
    const userId = userData.id_user;
    
    // Verifica si id_customer existe
    const customerData = await selectCustomerByIdModel(id_customer);
    if (!customerData) throw invalidCredentials('El cliente no existe');
    const customerId = customerData.id_customer;

    // Obtiene la información de la visita existente
    const existingVisitData = await getVisitData(visitId);

    // Compara los datos actuales con los datos proporcionados
    const visitData = {
        user_id: userId,
        customer_id: customerId,
        visit_date,
        observations
    };

    // Convertir la fecha en visitData a formato de fecha estándar
    const visitDataDate = new Date(visitData.visit_date).toISOString();

    // Comprueba si los datos son iguales
    if (existingVisitData.user_id === visitData.user_id &&
        existingVisitData.customer_id === visitData.customer_id &&
        existingVisitData.visit_date.toISOString() === visitDataDate &&
        existingVisitData.observations === visitData.observations) {
        // Los datos son iguales
        return { status: 'ok', message: 'Los datos ya estaban registrados.' };
    } else {
        // Si los datos son diferentes, actualiza la visita
        await insertOrUpdateVisitModel(visitId, userId, customerId, visit_date, observations);
        return { status: 'ok', message: 'Visita actualizada exitosamente' };
    }
}
