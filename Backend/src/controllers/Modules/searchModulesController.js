import { getModuleDeliveryNoteModel } from '../../models/Modules/getModuleDeliveryNoteModel.js';
import { getModuleInvoiceModel } from '../../models/Modules/getModuleInvoiceModel.js';
import { getModuleModel } from '../../models/Modules/getModuleModel.js';
import { getModulePaymentModel } from '../../models/Modules/getModulePaymentModel.js';
import { getModuleSalesModel } from '../../models/Modules/getModuleSalesModel.js';
import { getModuleShipmentModel } from '../../models/Modules/getModuleShipmentModel.js';
import { getModuleVisitModel } from '../../models/Modules/getModuleVisitModel.js';
import { invalidCredentials } from '../../services/error/errorService.js';

export const searchModulesController = async (req, res, next) => {
  try {
    // Obtengo el rol del usuario
    const userRole = req.user?.role;
    const searchTerm = req.query.search;

    let responseData = {};

    // Muestro la info por su respectivo rol
    if (userRole === 'admin') {
      const searchSale = await getModuleSalesModel(searchTerm);
      const searchVisit = await getModuleVisitModel(searchTerm);
      const searchDeliveryNote = await getModuleDeliveryNoteModel(searchTerm);
      const searchInvoice = await getModuleInvoiceModel(searchTerm);
      const searchPayment = await getModulePaymentModel(searchTerm);
      const searchShipment = await getModuleShipmentModel(searchTerm);
      const searchModules = await getModuleModel(searchTerm);

      responseData = {
        sales: searchSale,
        visits: searchVisit,
        deliveryNotes: searchDeliveryNote,
        invoice: searchInvoice,
        payment: searchPayment,
        shipment: searchShipment,
        Module: searchModules,
      };
    } else if (userRole === 'salesAgent') {
      const searchSale = await getModuleSalesModel(searchTerm);
      const searchVisit = await getModuleVisitModel(searchTerm);
      responseData = {
        visits: searchVisit,
        sales: searchSale,
      };
    } else if (userRole === 'deliverer') {
      const searchDeliveryNote = await getModuleDeliveryNoteModel(searchTerm);
      const searchShipment = await getModuleShipmentModel(searchTerm);

      responseData = {
        deliveryNotes: searchDeliveryNote,
        shipment: searchShipment,
      };
    } else {
      invalidCredentials('No tienes permisos. !');
    }

    // Responder con los modulos
    res.status(200).send({
      status: 'ok',
      message: 'Detalle de los modulos',
      data: responseData,
    });
  } catch (error) {
    next(error);
  }
};
