import { selectDeliveryNoteByIdSalesModel } from "../../../models/Modules/deliveryNote/selectDeliveryNoteByIdSalesModel.js";
import { selectInvoiceIdBySaleIdModel } from "../../../models/Modules/invoices/selectInvoiceIdBySaleIdModel.js";
import { deleteSaleModel } from "../../../models/Modules/sales/deleteSaleModel.js";
import { selectSaleByIdModel } from "../../../models/Modules/sales/selectSaleByIdModel.js";
import { selectShipmentByIdNoteModel } from "../../../models/Modules/shipment/selectShipmentByIdNoteModel.js";
import { errorDeleteSalesHasInvoice, errorDeleteSalesHasNote, errorDeleteSalesHasNoteAndShipment, errorDeleteSalesHasShipments, errorNotCancelSale, notFoundError } from "../../error/errorService.js";


export const deleteSaleService = async (id_sale) => {
  // Obtengo la venta
  const sale = await selectSaleByIdModel(id_sale);

  if (!sale || sale.id_sale !== id_sale) {
    notFoundError('Sale');
  }

  // Verifico si la venta tiene una factura asociada
  const invoiceId = await selectInvoiceIdBySaleIdModel(id_sale);

  // Si hay una factura asociada, no se puede borrar la venta
  if (invoiceId) {
    errorDeleteSalesHasInvoice();
  }
  console.log('paso por sales service', invoiceId);

  // Obtener el estado del albarán
  const deliveryNote = await selectDeliveryNoteByIdSalesModel(id_sale);

  // Obtener el estado del envío
  const shipment = await selectShipmentByIdNoteModel(deliveryNote.id_note);

  // Si hay tanto un delivery note como un shipment, no se puede borrar la venta
  if (deliveryNote && shipment) {
    errorDeleteSalesHasNoteAndShipment();
  }

  // Si hay solo un shipment, no se puede borrar la venta
  if (shipment && !deliveryNote) {
    errorDeleteSalesHasShipments();
  }

  // Si hay solo un delivery note
  if (deliveryNote && !shipment) {
    errorDeleteSalesHasNote();
  }

  // // Verificar si la operación está cancelada o pendiente
  // if (sale.operation_status !== 'pending' || sale.operation_status !== 'cancelled') {
  //   errorNotCancelSale();
  // }

  // Eliminamos la venta de producto de la base de datos
  const response = await deleteSaleModel(id_sale);

  return response;
};
