import { selectPaymentService } from '../../../services/Modules/payments/selectPaymentService.js';
import { success } from '../../../utils/success.js';

export const deletePaymentController = async (req, res, next) => {
  try {
    // Obtener el id del pago de la URL.
    const paymentsId = req.params.paymentsId;

    // Verifico si esta cancelado
    const deletePayment = await selectPaymentService(paymentsId);

    // Respondemos al cliente.
    res.status(200).send(success(deletePayment));
  } catch (error) {
    next(error);
  }
};
