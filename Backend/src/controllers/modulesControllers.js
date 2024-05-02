// Imports Modulos generales
import { getModuleController } from './Modules/getModuleController.js';
import { searchModulesController } from './Modules/searchModulesController.js';
import { deleteModuleController } from './Modules/deleteModuleController.js';

// Imports visitas
import { closeVisitController } from './Modules/Visits/closeVisitController.js';
import { deleteVisitController } from './Modules/Visits/deleteVisitController.js';
import { feedbackVisitController } from './Modules/Visits/feedbackVisitController.js';
import { getUserVisitsController } from './Modules/Visits/getUserVisitsController.js';
import { newVisitController } from './Modules/Visits/newVisitController.js';
import { updateVisitController } from './Modules/Visits/updateVisitController.js';

// Imports ventas
import { insertSalesController } from './Modules/sales/insertSalesController.js';
import { updateSalesController } from './Modules/sales/updateSalesController.js';
import { deleteSalesController } from './Modules/sales/deleteSalesController.js';

// Imports Facturas
import { newInvoiceController } from './Modules/invoices/newInvoiceController.js';
import { deleteInvoiceController } from './Modules/invoices/deleteInvoiceController.js';
import { statusUpdateInvoiceController } from './Modules/invoices/statusUpdateInvoiceController.js';

// Imports Pagos
import { newPaymentController } from './Modules/payments/newPaymentController.js';
import { cancelPaymentController } from './Modules/payments/cancelPaymentController.js';
import { deletePaymentController } from './Modules/payments/deletePaymentController.js';

// Imports Albarán
import { createDeliveryNoteController } from './Modules/deliveryNote/createDeliveryNoteController.js';
import { closeDeliveryNoteController } from './Modules/deliveryNote/closeDeliveryNoteController.js';
import { deleteDeliveryNoteController } from './Modules/deliveryNote/deleteDeliveryNoteController.js';

// Imports envios
import { shipmentCreateController } from './Modules/shipment/shipmentCreateController.js';
import { shipmentUpdateController } from './Modules/shipment/shipmentUpdateController.js';
import { deleteShipmentController } from './Modules/shipment/deleteShipmentController.js';
import { closeShipmentController } from './Modules/shipment/closeShipmentController.js';

// Exportar todos los controladores
export {
  getModuleController,
  searchModulesController,
  deleteModuleController,
  closeVisitController,
  deleteVisitController,
  feedbackVisitController,
  getUserVisitsController,
  newVisitController,
  updateVisitController,
  insertSalesController,
  updateSalesController,
  deleteSalesController,
  newInvoiceController,
  deleteInvoiceController,
  statusUpdateInvoiceController,
  newPaymentController,
  cancelPaymentController,
  deletePaymentController,
  createDeliveryNoteController,
  closeDeliveryNoteController,
  deleteDeliveryNoteController,
  shipmentCreateController,
  shipmentUpdateController,
  deleteShipmentController,
  closeShipmentController,
};
