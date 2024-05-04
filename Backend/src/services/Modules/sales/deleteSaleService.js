import { deleteSaleModel } from '../../../models/Modules/sales/deleteSaleModel.js';
import { selectSaleByIdModel } from '../../../models/Modules/sales/selectSaleByIdModel.js';
import { notFoundError } from '../../error/errorService.js';

export const deleteSaleService = async (id_sale) => {
  // Obtengo el id de la venta
  const sale = await selectSaleByIdModel(id_sale);

  if (sale && sale.id_sale !== id_sale) {
    notFoundError('Sale');
  }

  // Eliminamos la venta de producto de la base de datos
  const response = await deleteSaleModel(id_sale);

  return response;
};
