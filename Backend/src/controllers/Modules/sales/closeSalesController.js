import { updateStatusSaleService } from '../../../services/Modules/sales/updateStatusSaleService.js';

export const closeSalesController = async (req, res, next) => {
  try {
    // Obtenemos el id_user y el rol del token
    /* const { id_user, role } = req.user; */
    const { id, newStatus } = req.body;
    console.log(req.body);
    // Validamos el body
    /* await validateSchemaUtil(updateStatusSchema, req.body); */

    // Inserto en la base de datos el estado
    const statusUpdate = await updateStatusSaleService(id, newStatus);
    console.log(statusUpdate);

    res.send({
      status: 'ok',
      message: statusUpdate,
    });
  } catch (error) {
    next(error);
  }
};
