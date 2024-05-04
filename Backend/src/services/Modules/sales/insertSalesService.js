import { insertSaleProductModel } from '../../../models/Modules/sales/insertSaleProductModel.js';
import { selectCustomerByIdModel } from '../../../models/Modules/sales/selectCustomerByIdModel.js';
import { selectProductByIdModel } from '../../../models/Modules/sales/selectProductByIdModel.js';
import { selectUserByIdModel } from '../../../models/user/selectUserByIdModel.js';
import { notFoundError } from '../../error/errorService.js';

export const insertSalesService = async (
  id_user,
  saleProdut_id,
  customer_id
) => {
  // Compluebo si  existen con ese id
  const user = await selectUserByIdModel(id_user);

  if (user.id_user !== id_user) {
    notFoundError('User');
  }

  const saleProduct = await selectProductByIdModel(saleProdut_id);

  if (saleProduct.id_saleProduct !== saleProdut_id) {
    notFoundError('Product');
  }

  const customer = await selectCustomerByIdModel(customer_id);

  if (customer.id_customer !== customer_id) {
    notFoundError('customer');
  }

  // Genero el id
  const id_sale = crypto.randomUUID();

  // Insertamos la venta de producto en la base de datos
  const response = await insertSaleProductModel(
    id_sale,
    id_user,
    saleProdut_id,
    customer_id
  );

  return response;
};
