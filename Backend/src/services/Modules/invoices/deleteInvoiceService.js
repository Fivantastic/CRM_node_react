import { deleteInvoiceModel } from '../../../models/Modules/invoices/deleteInvoiceModel.js';
import { selectInvoiceById } from '../../../models/Modules/invoices/selectInvoiceById.js';
import { selectModuleByIdInvoiceModel } from '../../../models/Modules/invoices/selectModuleByIdInvoiceModel.js';
import { invalidCredentials } from '../../error/errorService.js';

export const deleteInvoiceService = async (invoiceId) => {
  // Verifica si la factura existe en la base de datos.
  const invoiceExists = await selectInvoiceById(invoiceId);
  if (!invoiceExists) {
    invalidCredentials('La factura no existe en la base de datos.');
  }

  if (invoiceExists.invoice_status !== 'cancelled') {
    invalidCredentials('La factura no esta cancelado');
  }

  // Obtiene todos los datos de la modulos
  const resultModules = await selectModuleByIdInvoiceModel(invoiceId);

  // Eliminar la factura de la base de datos.
  const deleteInvoice = await deleteInvoiceModel(
    invoiceId,
    resultModules.shipment_id,
    resultModules.deliveryNote_id
  );

  return deleteInvoice;
};
