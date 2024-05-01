import { deleteSaleModel } from '../../../models/Modules/sales/deleteSaleModel.js';
import { checkSaleOwnershipModel } from '../../../models/Modules/sales/checkSaleOwnershipModel.js';
import { selectSaleByIdModel } from '../../../models/Modules/sales/selectSaleByIdModel.js';
import { notFoundError, unauthorizedError } from '../../error/errorService.js';

export const deleteSaleService = async (
    id_sale,
    user_id
) => {
  try {
    // Obtengo el id de la venta
    const sale = await selectSaleByIdModel(id_sale); 

    if (!sale) {
      notFoundError('Sale');
    }

    const isUserOwner = await checkSaleOwnershipModel(user_id, id_sale)

    if (!isUserOwner) {
      unauthorizedError('Eliminar venta')
    }

    // Eliminamos la venta de producto de la base de datos
    await deleteSaleModel(id_sale);
  } catch (error) {
    console.error('Error :', error);
    throw error;
  }
};
