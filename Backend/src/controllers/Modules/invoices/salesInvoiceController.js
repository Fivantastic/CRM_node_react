import { getUnasignedSales } from '../../../utils/getUnasignedSales.js';
import { success } from '../../../utils/success.js';

export const getUnasignedSalesController = async (req, res, next) => {
  try {
    const unasignedSales = await getUnasignedSales();
    res.send(success({ data: unasignedSales }));

  } catch (error) {
    next(error);
  }
};