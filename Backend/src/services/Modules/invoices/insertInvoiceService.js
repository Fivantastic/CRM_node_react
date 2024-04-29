

export const newInvoiceService = async (userId, body) => {
    // Obtenemos el cuerpo de la petición
    const { sale_id, payment_method, due_date } = body;

    // Creamos una id para la venta
    const idInvoice = crypto.randomUUID();

    // Insertamos la factura en la base de datos
    const response = await insertInvoiceModel(idInvoice, userId, sale_id, payment_method, due_date);

    // Retornamos la respuesta
    return response
}