import { getVisitData } from "../../../models/Modules/visits/getVisitData.js";
import { invalidCredentials } from "../../error/errorService.js";
import { selectCustomerByIdModel } from "../../../models/customer/selectCustomerByIdModel.js";
import { updateVisitStatusModel } from "../../../models/Modules/visits/closeVisitModel.js";

export const closeVisitService = async (visitId, id_user, role, newStatus) => {
    // Comprobamos que esta visita existe
    const visitData = await getVisitData(visitId);
    if (!visitData) {
        invalidCredentials('La visita no existe');
    }

    // Comprobamos si el usuario es el propietario de la visita o un administrador
    if (visitData.user_id !== id_user && role !== 'admin') {
        invalidCredentials('No tienes permiso para modificar esta visita');
    }

    // Actualizamos el estado de la visita
    await updateVisitStatusModel(visitId, newStatus);

    // Retornamos el email del cliente si la visita se completa
    if (newStatus === 'completed') {
        const customer = await selectCustomerByIdModel(visitData.customer_id);
        const email = customer.email;
        return email;
    }

    return null;
};
