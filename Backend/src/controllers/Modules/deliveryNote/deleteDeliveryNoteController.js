import { selectDeliveryNoteService } from '../../../services/Modules/deleveryNote/selectDeliveryNoteService.js';
import { success } from '../../../utils/success.js';

export const deleteDeliveryNoteController = async (req, res, next) => {
  try {
    // Obtener el id del albarán de la URL.
    const id_note = req.params.deliveryNote_id;

    // Verifico si está cancelado
    const deleteDeliveryNote = await selectDeliveryNoteService(id_note);

    // Respondemos al albarán.
    res.status(200).send(success(deleteDeliveryNote));
  } catch (error) {
    next(error);
  }
};
