import { updateSaleProductSchema } from '../../../schemas/Modules/sale/updateSaleProductSchema.js';
import { updateSalesService } from '../../../services/Modules/sales/updateSalesService.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';

export const updateSalesController = async (req, res, next) => {
  // Todo: All
  try {
    const id_sale = req.params.id_sale;
    const { id_user, saleProduct_id, customer_id, operation_status } = req.body;

    // Validamos el body
    await validateSchemaUtil(updateSaleProductSchema, req.body);

    // Insertar que solo el user que la creó la modifique?
    const updatedSale = await updateSalesService(
      id_sale,
      id_user,
      saleProduct_id,
      customer_id,
      operation_status
    );

    res.status(200).send({
      status: 'ok',
      message: updatedSale,
    });
  } catch (error) {
    next(error);
  }
};
