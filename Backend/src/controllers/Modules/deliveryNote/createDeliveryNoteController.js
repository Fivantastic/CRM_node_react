import { createDeliveryNoteSchema } from '../../../schemas/Modules/deliveryNote/createDeliveryNoteSchema.js';
import { createDeliveryNoteService } from '../../../schemas/Modules/deliveryNote/insertDeliveryNotesServices.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';
import { success, errorResponse } from '../../../utils/success.js';

export const createDeliveryNoteController = async (req, res, next) => {
  try {
    // Validar el cuerpo de la solicitud
    await validateSchemaUtil(createDeliveryNoteSchemaema, req.body);

    const deliveryNoteData = req.body;

    // Insertar la nota de entrega y manejar si la venta no está pendiente
    const successMessage = await createDeliveryNoteService(deliveryNoteData);

    // Responder con éxito
    res.json(success({ message: successMessage }));
  } catch (error) {
    // Manejo de errores
    if (error.message.includes('No se puede crear una nota de entrega para una venta que no está pendiente.')) {
      return res.status(400).json(errorResponse({ message: 'La venta no está pendiente, no se puede crear la nota de entrega.' }));
    }

    next(error);
  }
};
