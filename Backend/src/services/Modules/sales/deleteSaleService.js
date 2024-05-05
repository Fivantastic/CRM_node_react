import { deleteSaleModel } from '../../../models/Modules/sales/deleteSaleModel.js';
import { selectModuleByIdSaleModel } from '../../../models/Modules/sales/selectModuleByIdSaleModel.js';
import { selectSaleByIdModel } from '../../../models/Modules/sales/selectSaleByIdModel.js';
import { notFoundError } from '../../error/errorService.js';

export const deleteSaleService = async (id_sale) => {
  // Obtengo el id de la venta
  const sale = await selectSaleByIdModel(id_sale);

  if (sale && sale.id_sale !== id_sale) {
    notFoundError('Sale');
  }

  console.log('sale', id_sale);

  // Obtiene todos los datos de la modulos
  const resultModules = await selectModuleByIdSaleModel(id_sale);

  // Eliminamos la venta de producto de la base de datos
  const response = await deleteSaleModel(id_sale, resultModules.shipment_id, resultModules.payment_id);

  return response;
};
