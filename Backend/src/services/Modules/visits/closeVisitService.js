import { getVisitData } from "../../../models/Modules/visits/getVisitData.js";
import { invalidCredentials } from "../../error/errorService.js";
import { closeVisitModel } from "../../../models/Modules/visits/closeVisitModel.js";
import { selectCustomerByIdModel } from "../../../models/customer/selectCustomerByIdModel.js";


export const closeVisitService = async (visitId, id_user) => {
    // Comprobamos que esta visita existe
    const visitData = await getVisitData(visitId);
    if (!visitData) {
        invalidCredentials('La visita no existe');
    }


    // Comprobamos si el usuario es el propietario de la visita
    // Si es asi, completamos la visita
    if (visitData.user_id === id_user) {
        const close_visit = 'completed';
        await closeVisitModel(visitId, close_visit);
    } else {
        invalidCredentials('No eres el propietario de la visita');
    }

    //retornamos el email del cliente, para notificarle que la visita ha sido cerrada y nosde su feedback
    const { email } = await selectCustomerByIdModel(visitData.customer_id);
    return email;
}