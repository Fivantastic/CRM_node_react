import { createDeliveryNoteService } from '../../../schemas/Modules/deliveryNote/insertDeliveryNotesServices.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';
import { createDeliveryNoteSchema } from '../../../schemas/Modules/deliveryNote/createDeliveryNoteSchema.js';
import { success } from '../../../utils/success.js';

export const createDeliveryNoteController = (emitDeliveryAssigned) => async (req, res, next) => {
  try {
    // Validar el cuerpo de la solicitud
    await validateSchemaUtil(createDeliveryNoteSchema, req.body);

    const { id_sale, deliverer_id } = req.body;

    // Llamar al servicio para crear la nota de entrega
    const result = await createDeliveryNoteService(id_sale, deliverer_id);

    // Emitir un evento al repartidor específico si el deliverer_id está presente
    if (deliverer_id) {
      emitDeliveryAssigned(deliverer_id, result.id_note);
    } else {
      console.log('No se encontró deliverer_id para emitir el evento');
    }

    res.json(success({ message: 'Albarán creado con éxito', data: result }));
  } catch (error) {
    console.error('Error en createDeliveryNoteController:', error);
    next(error);
  }
};
