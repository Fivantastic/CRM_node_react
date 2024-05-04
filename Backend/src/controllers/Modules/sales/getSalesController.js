import { selectSalesListModel } from '../../../models/Modules/sales/selectSalesListModel.js';
import { success } from '../../../utils/success.js';

export const getSalesController = async (req, res, next) => {
  try {
    const listSales = await selectSalesListModel();

    res.status(200).send(success(listSales));
  } catch (error) {
    next(error);
  }
};
