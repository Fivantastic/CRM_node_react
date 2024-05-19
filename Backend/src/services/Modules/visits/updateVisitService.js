import { invalidCredentials } from "../../error/errorService.js";
import { selectCustomerByIdModel } from "../../../models/customer/selectCustomerByIdModel.js";
import { selectUserByIdModel } from "../../../models/user/selectUserByIdModel.js";
import { getVisitData } from "../../../models/Modules/visits/getVisitData.js";
import { updateVisitModel } from "../../../models/Modules/visits/updateVisitModel.js";

export const updateVisitService = async (visitId, id_user, visit_date, observations) => {
    // Verifica si id_user existe
    const userData = await selectUserByIdModel(id_user);
    if (!userData) {
        invalidCredentials('El usuario no existe');
    }
    
    const userId = userData.id_user;

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
        await updateVisitModel(visitId, userId, customerId, visit_date, observations);
        return { status: 'ok', message: 'Visita actualizada exitosamente' };
    }
}
