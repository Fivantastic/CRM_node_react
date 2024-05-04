import { deleteSaleService } from '../../../services/Modules/sales/deleteSaleService.js';

export const deleteSalesController = async (req, res, next) => {
  try {
    const id_sale = req.params.id_sale;

    const sale = await deleteSaleService(id_sale);

    res.status(200).send({
      status: 'ok',
      message: sale,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
