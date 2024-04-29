import { selectCustomerIdBySaleIdModel } from "../../../models/Modules/invoices/selectCustomerIdBySaleIdModel.js";
import { selectCustomerByIdModel } from "../../../models/customer/selectCustomerByIdModel.js";


export const newInvoiceService = async (userId, body) => {
    // Obtenemos el cuerpo de la petición
    const { sale_id, payment_method, due_date } = body;

    // Extraemos el id del cliente de orden de venta
    const customerId = await selectCustomerIdBySaleIdModel(sale_id);
    // Extraemos los detalles del cliente
    const { address_id } = await selectCustomerByIdModel(customerId);

    // Creamos una id para la venta
    const idInvoice = crypto.randomUUID();

    // Insertamos la factura en la base de datos
    const response = await insertInvoiceModel(idInvoice, userId, sale_id, customerId, address_id, payment_method, due_date);

    // Retornamos la respuesta
    return response;
}