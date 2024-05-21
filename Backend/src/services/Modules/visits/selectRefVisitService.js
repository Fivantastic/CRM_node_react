import { selectRefVisitModel } from '../../../models/Modules/visits/selectRefVisitModel.js';

export const selectRefVisitService = async (visitId) => {
  const response = await selectRefVisitModel(visitId);

  console.log(response);

  return response;
};
