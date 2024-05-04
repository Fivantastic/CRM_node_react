import { updateSaleModel } from '../../../models/Modules/sales/updateSaleModel.js';
import { selectCustomerByIdModel } from '../../../models/Modules/sales/selectCustomerByIdModel.js';
import { selectProductByIdModel } from '../../../models/Modules/sales/selectProductByIdModel.js';
import { selectSaleByIdModel } from '../../../models/Modules/sales/selectSaleByIdModel.js';
import { notFoundError } from '../../error/errorService.js';
import { selectUserByIdModel } from '../../../models/user/selectUserByIdModel.js';

export const updateSalesService = async (
  id_sale,
  id_user,
  saleProduct_id,
  customer_id,
  operation_status
) => {
  // Obtengo el id de la venta
  const sale = await selectSaleByIdModel(id_sale);

  if (sale.id_sale !== id_sale) {
    notFoundError('Sale');
  }

  const user = await selectUserByIdModel(id_user);

  if (user && user.id_user !== id_user) {
    notFoundError('User');
  }

  const saleProduct = await selectProductByIdModel(saleProduct_id);

  if (saleProduct && saleProduct.id_saleProduct !== saleProduct_id) {
    notFoundError('Sale Product');
  }

  const customer = await selectCustomerByIdModel(customer_id);

  if (customer && customer.id_customer !== customer_id) {
    notFoundError('customer');
  }

  // Actualizamos la venta de producto en la base de datos
  const response = await updateSaleModel(
    id_sale,
    saleProduct_id,
    customer_id,
    operation_status
  );

  return response;
};
