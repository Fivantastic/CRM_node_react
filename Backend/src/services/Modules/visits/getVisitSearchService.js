import { selectVisitSearchModel } from '../../../models/Modules/visits/selectVisitSearchModel.js';

export const getVisitSearchService = async (searchTerm) => {
  // Buscamos en la base de datos el usuario.

  console.log(searchTerm);
  const visit = await selectVisitSearchModel(searchTerm);

  return visit;
};
