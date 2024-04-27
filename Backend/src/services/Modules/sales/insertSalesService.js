import { insertSaleProductModel } from '../../../models/Modules/sales/insertSaleProductModel.js';
import { selectCustomerByIdModel } from '../../../models/Modules/sales/selectCustomerByIdModel.js';
import { selectProductByIdModel } from '../../../models/Modules/sales/selectProductByIdModel.js';
import { selectUserByIdModel } from '../../../models/Modules/sales/selectUserByIdModel.js';
import { notFoundError } from '../../error/errorService.js';

export const insertSalesService = async (
  id_sale,
  user_id,
  saleProdut_id,
  customer_id
) => {
  try {
    // Obtengo el id de la producto
    const [saleProdut] = await selectProductByIdModel(saleProdut_id);

    if (!saleProdut) {
      notFoundError('Product');
    }
    const user = await selectUserByIdModel(user_id);

    if (!user) {
      notFoundError('user');
    }
    const [customer] = await selectCustomerByIdModel(customer_id);

    if (!customer) {
      notFoundError('customer');
    }

    // Insertamos la venta de producto en la base de datos
    await insertSaleProductModel(id_sale, user_id, saleProdut_id, customer_id);
  } catch (error) {
    console.error('Error :', error);
    throw error;
  }
};
