import { createDeliveryNoteService } from '../../../schemas/Modules/deliveryNote/insertDeliveryNotesServices.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';
import { createDeliveryNoteSchema } from '../../../schemas/Modules/deliveryNote/createDeliveryNoteSchema.js';
import { success, errorResponse } from '../../../utils/success.js';

export const createDeliveryNoteController = async (req, res, next) => {
  try {
    // Validar el cuerpo de la solicitud
    await validateSchemaUtil(createDeliveryNoteSchema, req.body);

    const { ref_SL, deliverer_id } = req.body;

    // Llamar al servicio para crear la nota de entrega
    const result = await createDeliveryNoteService({ ref_SL, deliverer_id });

    res.json(success({ message: 'Albarán creado con exito', data: result }));
  } catch (error) {
    next(error);
  }
};
