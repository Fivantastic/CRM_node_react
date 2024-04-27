import { selectCustomersListModel } from '../../models/customer/selectCustomerListModel.js';
import { success } from '../../utils/success.js';

export const getCustomerListController = async (req, res, next) => {
  try {
    const listCustomers = await selectCustomersListModel();

    res.status(200).send(
      success(listCustomers)
    );
  } catch (error) {
    next(error);
  }
};
