import { selectDeliveryNoteByIdSalesModel } from '../../../models/Modules/deliveryNote/selectDeliveryNoteByIdSalesModel.js';
import { selectShipmentByIdNoteModel } from '../../../models/Modules/shipment/selectShipmentByIdNoteModel.js';
import { updateStatusSchema } from '../../../schemas/Modules/sale/updateStatusSchema.js';
import { updateStatusSaleService } from '../../../services/Modules/sales/updateStatusSaleService.js';
import { errorNoteAndShipmentNotCancelled, errorNoteNotCancelled } from '../../../services/error/errorService.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';

export const closeSalesController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(updateStatusSchema, req.body);
    console.log(req.body);

    // Obtenemos el id y el nuevo estado del body
    const { id, newStatus } = req.body;

    // Obtener el estado actual del albarán
    const deliveryNote = await selectDeliveryNoteByIdSalesModel(id);

    // Obtener el estado del envío
    const shipment = await selectShipmentByIdNoteModel(deliveryNote.id_note);

    // Verificar si hay datos en shipment
    if (shipment && deliveryNote) {
      // Verificar si el estado del albarán y el estado de envío están cancelados
      if (deliveryNote.delivery_status !== 'cancelled' || shipment.shipment_status !== 'cancelled') {
        errorNoteAndShipmentNotCancelled();
      }
    }


    if (shipment) {
      if (shipment.shipment_status !== 'cancelled') {
        errorNoteAndShipmentNotCancelled();
      }
    }

    if (deliveryNote) {
      if (deliveryNote.delivery_status !== 'cancelled') {
        errorNoteNotCancelled();
      }
    }


    // Inserto en la base de datos el estado
    const statusUpdate = await updateStatusSaleService(id, newStatus);

    res.send({
      status: 'ok',
      message: statusUpdate,
    });
  } catch (error) {
    next(error);
  }
};