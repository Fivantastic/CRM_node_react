import { selectSalesSearchModel } from '../../../models/Modules/sales/selectSalesSearchModel.js';

export const getSalesSearchService = async (search) => {
  // Buscamos en la base de datos el usuario.

  console.log(search);
  const sale = await selectSalesSearchModel(search);

  return sale;
};
