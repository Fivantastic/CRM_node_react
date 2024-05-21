import { feedbackVisitModel } from '../../../models/Modules/visits/feedbackVisitModel.js';
import { selectIdVisitByIdService } from './selectIdVisitByIdService.js';
import { invalidCredentials } from '../../error/errorService.js';
import { selectIdVisitMosuleByIdService } from '../selectIdVisitMosuleByIdService.js';

export const feedbackVisitService = async (body, ref_VT) => {
  //Obtenemos el body la valoracion y el comentario
  const { rating_visit, comment_visit } = body;

  console.log(comment_visit);
  console.log(rating_visit);
  // Obtengo el id de la visita
  const feedbackVisit = await selectIdVisitByIdService(ref_VT);

  console.log('fedBackID', feedbackVisit.id_visit);
  // Validamos que no exista una valoracion previa
  const feedbackModules = await selectIdVisitMosuleByIdService(
    feedbackVisit.id_visit
  );

  if (feedbackModules.rating_module !== null) {
    invalidCredentials('Ya has realizado una valoración para esta visita');
  }

  //Llamamos al servicio
  const response = await feedbackVisitModel(
    feedbackVisit.id_visit,
    rating_visit,
    comment_visit
  );

  return response;
};
