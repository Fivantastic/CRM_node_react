import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js'; // Modelo para insertar el albarán
import { closeDeliveryNoteSchema } from '../../../schemas/Modules/deliveryNote/closeDeliveryNoteSchema.js';
import { inserClosedDeleveryNoteService } from '../../../services/Modules/deleveryNote/inserClosedDeleveryNoteService.js';
import { success } from '../../../utils/success.js';

export const closeDeliveryNoteController = async (req, res, next) => {
  try {
    // Validar el cuerpo de la solicitud
    await validateSchemaUtil(closeDeliveryNoteSchema, req.body);

    // Obtengo el id del delivery_note
    const deliveryNote_id = req.params.deliveryNote_id;

    // Llamar al servicio para cerrar el albarán
    const result = await inserClosedDeleveryNoteService(
      deliveryNote_id,
      req.body
    );

    // Mensaje al cliente para cerrando la operación exitosamente.
    res.json(success({ message: 'Albarán modificado con éxito', data: result }));
  } catch (error) {
    next(error);
  }
};
