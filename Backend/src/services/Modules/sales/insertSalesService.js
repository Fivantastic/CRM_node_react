import { insertSaleProductModel } from '../../../models/Modules/sales/insertSaleProductModel.js';
import { selectCustomerByIdModel } from '../../../models/Modules/sales/selectCustomerByIdModel.js';
import { selectProductByIdModel } from '../../../models/Modules/sales/selectProductByIdModel.js';
import { getMaxReference5Digits } from '../../../models/getMaxReference.js';
import { selectUserByIdModel } from '../../../models/user/selectUserByIdModel.js';
import { generateReference5DigitsFromRef } from '../../../utils/generateReference5Digits.js';
import { notFoundError } from '../../error/errorService.js';

export const insertSalesService = async (
  id_user,
  id_saleProduct,
  id_customer
) => {
  // Compluebo si  existen con ese id
  const user = await selectUserByIdModel(id_user);

  if (user.id_user !== id_user) {
    notFoundError('User');
  }

  const saleProduct = await selectProductByIdModel(id_saleProduct);

  if (saleProduct.id_saleProduct !== id_saleProduct) {
    notFoundError('Product');
  }

  const customer = await selectCustomerByIdModel(id_customer);

  if (customer.id_customer !== id_customer) {
    notFoundError('customer');
  }

  // Genero el id
  const id_sale = crypto.randomUUID();
  console.log('inserSalesService', id_customer);

  // Obtenemos la referencia máxima de la tabla Sales
  const maxRef = await getMaxReference5Digits('Sales', 'ref_SL');

  // Generamos la nueva referencia de Sales
  const ref = generateReference5DigitsFromRef('SL', maxRef);

  // Insertamos la venta de producto en la base de datos
  const response = await insertSaleProductModel(
    id_sale,
    ref,
    id_user,
    id_saleProduct,
    id_customer
  );

  return response;
};
