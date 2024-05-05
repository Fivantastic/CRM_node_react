import { selectSalesListModel } from '../../../models/Modules/sales/selectSalesListModel.js';
import { invalidCredentials } from '../../../services/error/errorService.js';

export const getSalesController = async (req, res, next) => {
  try {
    const listSales = await selectSalesListModel();

    if (listSales === undefined) {
      invalidCredentials('Error al obtener las ventas');
    }

    res.status(200).send({
      status: 'ok',
      message: 'Sales',
      data: listSales,
    });
  } catch (error) {
    next(error);
  }
};
