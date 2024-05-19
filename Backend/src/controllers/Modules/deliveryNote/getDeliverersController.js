import { getDeliverers } from '../../../utils/getDeliverers.js';
import { success } from '../../../utils/success.js';

export const getDeliverersController = async (req, res, next) => {
  try {
    const deliverers = await getDeliverers();
    res.json(success({ data: deliverers }));
  } catch (error) {
    next(error);
  }
};
