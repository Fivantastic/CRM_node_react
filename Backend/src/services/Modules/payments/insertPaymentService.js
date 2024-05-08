import { insertPaymentModel } from "../../../models/Modules/payments/insertPaymentModel.js";
import { notFoundError } from "../../error/errorService.js";
import { selectInvoiceByIdService } from "../../product/selectInvoiceByIdService.js";

export const newPaymentService = async (body) => {
    // Obtenemos el cuerpo de la petición
    const { invoice_id, amount, payment_date } = body
    
    // Revisamos que la factura exista
    const invoice = await selectInvoiceByIdService(invoice_id)

    if(!invoice){
        notFoundError('Invoice');
    }

    // ? Creamos una id para el pago
    const payment_id = crypto.randomUUID();

    // Insertamos la factura en la base de datos
    const data = await insertPaymentModel(payment_id, invoice_id, amount, payment_date);

    // Retornamos la respuesta
    return data;
}