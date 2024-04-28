import { updateSaleModel } from '../../../models/Modules/sales/updateSaleModel.js';
import { selectCustomerByIdModel } from '../../../models/Modules/sales/selectCustomerByIdModel.js';
import { selectProductByIdModel } from '../../../models/Modules/sales/selectProductByIdModel.js';
import { selectSaleByIdModel } from '../../../models/Modules/sales/selectSaleByIdModel.js';
import { notFoundError } from '../../error/errorService.js';

export const updateSalesService = async (
    id_sale,
    saleProduct_id,
    customer_id,
    operation_status
) => {
  try {
    // Obtengo el id de la venta
    const sale = await selectSaleByIdModel(id_sale);

    console.log(sale);

    if (!sale) {
      notFoundError('Sale');
    }

    const [saleProduct] = await selectProductByIdModel(saleProduct_id);

    if (!saleProduct) {
      notFoundError('Sale Product');
    }

    const [customer] = await selectCustomerByIdModel(customer_id);

    if (!customer) {
      notFoundError('customer');
    }

    // Actualizamos la venta de producto en la base de datos
    await updateSaleModel(id_sale, saleProduct_id, customer_id, operation_status);
  } catch (error) {
    console.error('Error :', error);
    throw error;
  }
};
