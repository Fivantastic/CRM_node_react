import { insertPaymentModel } from "../../../models/Modules/payments/insertPaymentModel.js";

export const newPaymentService = async (body) => {
    // Obtenemos el cuerpo de la petición
    const { invoice_id, amount, payment_date } = body

    // Creamos una id para el pago
    const idPayment = crypto.randomUUID();

    // Insertamos la factura en la base de datos
    const response = await insertPaymentModel(idPayment, invoice_id, amount, payment_date);

    // Retornamos la respuesta
    return response
}