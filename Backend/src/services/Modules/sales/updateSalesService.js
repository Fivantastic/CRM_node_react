import { updateSaleModel } from '../../../models/Modules/sales/updateSaleModel.js';
import { selectCustomerByIdModel } from '../../../models/Modules/sales/selectCustomerByIdModel.js';
import { selectProductByIdModel } from '../../../models/Modules/sales/selectProductByIdModel.js';
import { selectSaleByIdModel } from '../../../models/Modules/sales/selectSaleByIdModel.js';
import { notFoundError } from '../../error/errorService.js';

export const updateSalesService = async (
  id_sale,
  id_saleProduct,
  id_customer
) => {
  // Obtengo el id de la venta
  const sale = await selectSaleByIdModel(id_sale);

  if (sale.id_sale !== id_sale) {
    notFoundError('Sale');
  }

  const saleProduct = await selectProductByIdModel(id_saleProduct);

  if (saleProduct && saleProduct.id_saleProduct !== id_saleProduct) {
    notFoundError('Sale Product');
  }

  const customer = await selectCustomerByIdModel(id_customer);

  if (customer && customer.id_customer !== id_customer) {
    notFoundError('customer');
  }

  // Actualizamos la venta de producto en la base de datos
  const response = await updateSaleModel(id_sale, id_saleProduct, id_customer);

  return response;
};
