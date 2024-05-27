import { closedInvoiceSchema } from '../../../schemas/Modules/invoice/newInvoiceSchema.js';
import { statusUpdateInvoiceService } from '../../../services/Modules/invoices/statusUpdateInvoiceService.js';
import { success } from '../../../utils/success.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';

export const statusUpdateInvoiceController = async (req, res, next) => {
  try {
    // Obtener el id de la factura del URL.
    const invoiceId = req.params.invoiceId;

    // Validar el body con Joi.
    await validateSchemaUtil(closedInvoiceSchema, req.body);

    // Cerramos la factura y obtenemos el email del cliente.
    const response = await statusUpdateInvoiceService(invoiceId, req.body);

    // Respondemos al cliente.
    res.status(200).send(success(response));
  } catch (error) {
    next(error);
  }
};
