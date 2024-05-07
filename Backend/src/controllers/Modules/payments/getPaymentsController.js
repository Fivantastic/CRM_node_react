import { selectPaymentsListModel } from '../../../models/Modules/payments/selectPaymentsListModel.js';
import { invalidCredentials } from '../../../services/error/errorService.js';

export const getPaymentsController = async (req, res, next) => {
  try {
    const listPayments = await selectPaymentsListModel();

    if (listPayments === undefined) {
      invalidCredentials('Error al obtener los pagos');
    }

    res.status(200).send({
      status: 'ok',
      message: 'Payments',
      data: listPayments,
    });
  } catch (error) {
    next(error);
  }
};
