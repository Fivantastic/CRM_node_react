import { deletePaymentModel } from '../../../models/Modules/payments/deletePaymentModel.js';
import { invalidCredentials } from '../../../services/error/errorService.js';
import { success } from '../../../utils/success.js';

export const deletePaymentController = async (req, res, next) => {
  try {
    // Obtener el id del pago de la URL.
    const paymentsId = req.params.paymentsId;

    // Eliminar el pago de la base de datos.
    const deletePayment = await deletePaymentModel(paymentsId);

    if (!deletePayment) {
      invalidCredentials('El pago no existe');
    }

    // Respondemos al cliente.
    res.status(200).send(success(deletePayment));
  } catch (error) {
    next(error);
  }
};
