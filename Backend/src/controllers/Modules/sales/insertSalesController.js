import { newSaleProductSchema } from '../../../schemas/Modules/sale/newSaleProductSchema.js';
import { insertSalesService } from '../../../services/Modules/sales/insertSalesService.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';

export const insertSalesController = async (req, res, next) => {
  try {
    const id_user = req.user.id_user;
    const { saleProduct_id, customer_id } = req.body;

    // Validamos el body
    await validateSchemaUtil(newSaleProductSchema, req.body);

    const sale = await insertSalesService(id_user, saleProduct_id, customer_id);

    res.status(200).send({
      status: 'ok',
      message: { sale },
    });
  } catch (error) {
    next(error);
  }
};
