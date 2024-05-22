import { selectProductSearchModel } from '../../models/products/selectProductSearchModel.js';

export const getProductSearchService = async (search) => {
  // Buscamos en la base de datos el producto.

  const product = await selectProductSearchModel(search);

  return product;
};
