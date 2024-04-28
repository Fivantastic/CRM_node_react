import { deleteSaleSchema } from '../../../schemas/Modules/sale/deleteSaleSchema.js';
import { deleteSaleService } from '../../../services/Modules/sales/deleteSaleService.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';

export const deleteSalesController = async (req, res, next) => {
  try {
    const data = {
      id_sale: req.params.id_sale,
      user_id: req.userId
    }
    // console.log(data); // Test

    //Todo: Validamos el param (id) y si pertencece al user (user id de petición)
    await validateSchemaUtil(deleteSaleSchema, data);

    const sale = await deleteSaleService(
      data.id_sale,
      data.user_id
    );

    res.status(200).send({
      status: 'ok',
      message: 'Venta eliminada con éxito!',
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
