import { updateSaleProductSchema } from '../../../schemas/Modules/sale/updateSaleProductSchema.js';
import { updateSalesService } from '../../../services/Modules/sales/updateSalesService.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';

export const updateSalesController = async (req, res, next) => {
    // Todo: All
  try {
    const user_id = req.userId
    const id_sale = req.params.id_sale
    const { saleProduct_id, customer_id, operation_status } = req.body

    const data = {
        user_id,
        id_sale,
        saleProduct_id,
        customer_id,
        operation_status
    }

    // Validamos el body
    await validateSchemaUtil(updateSaleProductSchema, data);

    // Insertar que solo el user que la creó la modifique?

    const updatedSale = await updateSalesService(
        id_sale,
        saleProduct_id,
        customer_id,
        operation_status
    );

    res.status(200).send({
      status: 'ok',
      message: 'Venta actualizada con éxito!',
    });
  } catch (error) {
    next(error);
  }
};
