import { selectIdVisitMosuleByIdService } from "../../../services/Modules/selectIdVisitMosuleByIdService.js";
import { selectIdVisitByIdService } from "../../../services/Modules/visits/selectIdVisitByIdService.js";

export const feedbackVisitCheckService = async ( ref_VT ) => {
  
    // Obtengo el id de la visita
    const feedbackVisit = await selectIdVisitByIdService(ref_VT);
  
    // Validamos que no exista una valoracion previa
    const response = await selectIdVisitMosuleByIdService(
      feedbackVisit.id_visit
    );
    
    return response;
  };
  