import { getPendingSales } from '../../../utils/getPendingSales.js';

export const getOpenSalesController = async (req, res, next) => {
  try {
    const pendingSales = await getPendingSales();

    res.status(200).json({
      status: 'ok',
      message: 'Delivery Notes',
      data: { pendingSales },
    });
  } catch (error) {
    next(error);
  }
};
