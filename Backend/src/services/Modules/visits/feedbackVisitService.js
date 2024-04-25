import { feedbackVisitModel } from "../../../models/Modules/visits/feedbackVisitModel.js";
import { selectIdVisitByIdService } from "./selectIdVisitByIdService.js";
import { invalidCredentials } from "../../error/errorService.js";


export const feedbackVisitService = async (visitId, body) => {
    //Obtenemos el body la valoracion y el comentario
    const { rating_visit, comment_visit } = body;

    // Validamos que no exista una valoracion previa
    const feedbackVisit = await selectIdVisitByIdService(visitId);

    console.log(feedbackVisit.rating_visit);
    if (feedbackVisit.rating_visit !== null) throw invalidCredentials('Ya has realizado una valoración para esta visita');

    //Llamamos al servicio
    const response = await feedbackVisitModel(visitId, rating_visit, comment_visit);

    return response;
}