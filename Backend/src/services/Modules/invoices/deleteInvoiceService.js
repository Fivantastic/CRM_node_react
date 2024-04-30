import { deleteInvoiceModel } from "../../../models/Modules/invoices/deleteInvoiceModel.js";
import { selectInvoiceById } from "../../../models/Modules/invoices/selectInvoiceById.js";
import { invalidCredentials } from "../../error/errorService.js";


export const deleteInvoiceService = async (invoiceId) => {
    // Verifica si la factura existe en la base de datos.
    const invoiceExists = await selectInvoiceById(invoiceId);
    if (!invoiceExists) {
        throw invalidCredentials('La factura no existe en la base de datos.');
    }
    // Eliminar la factura de la base de datos.
    const deleteInvoice = await deleteInvoiceModel(invoiceId);

    return deleteInvoice;
}