import { updateStatusSchema } from '../../../schemas/Modules/sale/updateStatusSchema.js';
import { updateStatusSaleService } from '../../../services/Modules/sales/updateStatusSaleService.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';

export const closeSalesController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(updateStatusSchema, req.body);
    
    // Obtenemos el id_user y el rol del token
    const { id, newStatus } = req.body;;

    // Inserto en la base de datos el estado
    const statusUpdate = await updateStatusSaleService(id, newStatus);

    res.send({
      status: 'ok',
      message: statusUpdate,
    });
  } catch (error) {
    next(error);
  }
};
