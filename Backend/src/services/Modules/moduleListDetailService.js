import { selectModuleListDetailModel } from '../../models/Modules/visits/selectModuleListDetailModel.js';

export const moduleListDetailService = async () => {
  const response = await selectModuleListDetailModel();

  if (response === undefined) {
    invalidCredentials('Error al obtener los modulos');
  }

  return response;
};
