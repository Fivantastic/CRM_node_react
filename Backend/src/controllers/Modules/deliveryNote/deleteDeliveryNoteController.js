import { deleteDeliveryNoteModel } from '../../../models/Modules/deliveryNote/deleteDeliveryNoteModel.js';
import { success } from '../../../utils/success.js';

export const deleteDeliveryNoteController = async (req, res, next) => {
  try {
    // Obtener el id del albaran de la URL.
    const deliveryNote_id = req.params.deliveryNote_id;

    // Eliminar el albaran de la base de datos.
    const deleteDeliveryNote = await deleteDeliveryNoteModel(deliveryNote_id);

    if (!deleteDeliveryNote) {
      invalidCredentials('El albaran no existe');
    }

    // Respondemos al albaran.
    res.status(200).send(success(deleteDeliveryNote));
  } catch (error) {
    next(error);
  }
};
