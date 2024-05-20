import { selectCustomersListModel } from '../../models/customer/selectCustomerListModel.js';

export const getCustomerListController = async (req, res, next) => {
  try {
    const listCustomers = await selectCustomersListModel();

    res.status(200).send({
      status: 'ok',
      data: listCustomers,
    });
  } catch (error) {
    next(error);
  }
};
