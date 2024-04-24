import { newSaleProductSchema } from '../../schemas/newSaleProductSchema.js';
import { insertSalesService } from '../../services/insertSalesService.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const insertSalesController = async (req, res, next) => {
  try {
    const { user_id, saleProdut_id, customer_id } = req.body;

    // Validamos el body
    await validateSchemaUtil(newSaleProductSchema, req.body);

    // Genero el id
    const id_sale = crypto.randomUUID();

    const sale = await insertSalesService(
      id_sale,
      user_id,
      saleProdut_id,
      customer_id
    );

    res.status(200).send({
      status: 'ok',
      message: 'Venta registrada con exito. !',
    });
  } catch (error) {
    next(error);
  }
};
