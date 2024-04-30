import { deleteInvoiceService } from "../../../services/Modules/invoices/deleteInvoiceService.js";
import { success } from "../../../utils/success.js";

export const deleteInvoiceController = async (req, res, next) => {
    try {
        // Obtener el id de la factura del URL.
        const invoiceId = req.params.invoiceId;

        // Eliminar la factura de la base de datos. 
        const response = await deleteInvoiceService(invoiceId);
        
        // Respondemos al cliente.
        res.status(200).send(success(response));
    } catch (error) {
        next(error);
    }
}