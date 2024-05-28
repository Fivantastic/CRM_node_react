import { selectIdVisitByIdFeedbackService } from "../../../services/Modules/visits/selectIdVisitByIdFeedbackService.js";

export const feedbackVisitCheckService = async ( ref_VT ) => {
  
    // Obtengo el id de la visita
    const response = await selectIdVisitByIdFeedbackService(ref_VT);
    
    return response[0];
  };
  