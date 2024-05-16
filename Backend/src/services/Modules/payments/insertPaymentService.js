import { insertPaymentModel } from "../../../models/Modules/payments/insertPaymentModel.js";
import { getMaxReference5Digits } from "../../../models/getMaxReference.js";
import { generateReference5DigitsFromRef } from "../../../utils/generateReference5Digits.js";
import { notFoundError } from "../../error/errorService.js";
import { selectInvoiceByIdService } from "../../product/selectInvoiceByIdService.js";

export const newPaymentService = async (body) => {
    // Obtenemos el cuerpo de la petición
    const { invoice_id, payment_date } = body
    
    // Revisamos que la factura exista
    const invoice = await selectInvoiceByIdService(invoice_id)

    if(!invoice){
        notFoundError('Invoice');
    }

    // ? Creamos una id para el pago
    const payment_id = crypto.randomUUID();

    // Obtenemos la referencia máxima de la tabla Payments
    const maxRef = await getMaxReference5Digits('Payments', 'ref_PM');

    // Generamos la nueva referencia de Payments
    const ref = generateReference5DigitsFromRef('PM', maxRef);

    // Insertamos la factura en la base de datos
    const data = await insertPaymentModel(payment_id, ref, invoice_id, payment_date);

    // Retornamos la respuesta
    return data;
}