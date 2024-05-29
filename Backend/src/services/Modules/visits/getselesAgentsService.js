import { selectVisitAgentsModel } from "../../../models/Modules/visits/selectVisitAgentsModel.js";

export const getselesAgentsService = async (searchTerm) => {
    // Buscamos en la base de datos el usuario.
    const visitAgents = await selectVisitAgentsModel(searchTerm);
  
    return visitAgents;
  };