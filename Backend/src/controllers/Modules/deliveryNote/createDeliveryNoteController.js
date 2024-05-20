import { createDeliveryNoteService } from '../../../schemas/Modules/deliveryNote/insertDeliveryNotesServices.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';
import { createDeliveryNoteSchema } from '../../../schemas/Modules/deliveryNote/createDeliveryNoteSchema.js';
import { success } from '../../../utils/success.js';

export const createDeliveryNoteController = async (req, res, next) => {
  try {
    // Validar el cuerpo de la solicitud
    await validateSchemaUtil(createDeliveryNoteSchema, req.body);

    const { id_sale, deliverer_id } = req.body;

    // Llamar al servicio para crear la nota de entrega
    const result = await createDeliveryNoteService(id_sale, deliverer_id);

    res.status(200).send({
      status: 'ok',
      message: 'Albarán creado con éxito',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
