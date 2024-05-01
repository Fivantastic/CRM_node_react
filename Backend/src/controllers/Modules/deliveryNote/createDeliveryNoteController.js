import { createDeliveryNoteService } from '../../../schemas/Modules/deliveryNote/insertDeliveryNotesServices.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';
import { createDeliveryNoteSchema } from '../../../schemas/Modules/deliveryNote/createDeliveryNoteSchema.js';
import { success, errorResponse } from '../../../utils/success.js';

export const createDeliveryNoteController = async (req, res, next) => {
  try {
    // Validar el cuerpo de la solicitud
    await validateSchemaUtil(createDeliveryNoteSchema, req.body);

    const deliveryNoteData = req.body;

    // Insertar la nota de entrega con los datos proporcionados
    await createDeliveryNoteService(deliveryNoteData);

    // Responder con éxito
    res.json(success({ message: 'Albarán creado con éxito' }));
  } catch (error) {
      next(error); // Manejo de errores
  }
  
};
