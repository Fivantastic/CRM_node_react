import { newSaleProductSchema } from '../../../schemas/Modules/sale/newSaleProductSchema.js';
import { insertSalesService } from '../../../services/Modules/sales/insertSalesService.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';

export const insertSalesController = async (req, res, next) => {
  try {
    const user_id = req.userId
    const { saleProduct_id, customer_id } = req.body;
    console.log('Debug: ', saleProduct_id, customer_id);

    const data = {
      user_id,
      saleProduct_id,
      customer_id
    }

    // Validamos el body
    await validateSchemaUtil(newSaleProductSchema, data);

    // Genero el id
    const id_sale = crypto.randomUUID();

    const sale = await insertSalesService(
      id_sale,
      user_id,
      saleProduct_id,
      customer_id
    );


    res.status(200).send({
      status: 'ok',
      message: 'Venta registrada con exito!',
    });
  } catch (error) {
    next(error);
  }
};
