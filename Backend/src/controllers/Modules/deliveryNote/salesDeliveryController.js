import { getPendingSales } from '../../../utils/getPendingSales.js';
import { success, errorResponse } from '../../../utils/success.js';

export const getOpenSalesController = async (req, res, next) => {
  try {
    const pendingSales = await getPendingSales();
    res.json(success({ data: pendingSales }));
  } catch (error) {
    next(error);
  }
};


