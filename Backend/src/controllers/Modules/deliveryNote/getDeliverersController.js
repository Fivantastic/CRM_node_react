import { getDeliverers } from '../../../utils/getDeliverers.js';

export const getDeliverersController = async (req, res, next) => {
  try {
    const deliverers = await getDeliverers();
    res.status(200).send({
      status: 'ok',
      data: { deliverers },
    });
  } catch (error) {
    next(error);
  }
};
