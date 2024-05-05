import { selectInvoiceListModel } from '../../../models/Modules/invoices/selectInvoiceListModel.js';
import { invalidCredentials } from '../../../services/error/errorService.js';

export const getInvoiceController = async (req, res, next) => {
  try {
    // Obtengo la lista de facturas
    const listInvoice = await selectInvoiceListModel();

    if (listInvoice === undefined) {
      invalidCredentials('Error al obtener las facturas');
    }

    res.status(200).send({
      status: 'ok',
      message: 'Facturas',
      data: listInvoice,
    });
  } catch (error) {
    next(error);
  }
};
