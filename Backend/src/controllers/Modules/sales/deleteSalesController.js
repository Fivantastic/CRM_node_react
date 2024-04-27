import { newSaleProductSchema } from '../../../schemas/Modules/sale/newSaleProductSchema.js';
import { insertSalesService } from '../../../services/Modules/sales/insertSalesService.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';

export const deleteSalesController = async (req, res, next) => {
    // Todo: all
  try {
    const { /* Data */ } = req.body;

    //Todo: Validamos el param (id) y si pertencece al user (user id de petición)
    // await validateSchemaUtil(THIS_SCHEMA, req.body);

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
