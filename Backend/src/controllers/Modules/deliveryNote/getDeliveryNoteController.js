import { selectDeliveryNotesModel } from '../../../models/deliveryNote/selectDeliveryNotesModel.js';
import { invalidCredentials } from '../../../services/error/errorService.js';

// Define el controlador para obtener notas de entrega
export const getDeliveryNotesController = async (req, res, next) => {
  try {
    // Obtiene las notas de entrega utilizando la función del modelo
    const deliveryNotes = await selectDeliveryNotesModel();

    // Verifica si se obtuvieron las notas de entrega
    if (!deliveryNotes) {
      // Si no se obtuvieron, lanza un error
      invalidCredentials('Error al obtener las notas de entrega');
    }

    // Envía la respuesta con las notas de entrega
    res.status(200).send({
      status: 'ok',
      message: 'Delivery Notes',
      data: deliveryNotes,
    });
  } catch (error) {
    // Manejo de errores
    next(error);
  }
};
