import { selectDeliveryNoteService } from '../../../services/Modules/deleveryNote/selectDeliveryNoteService.js';

export const deleteDeliveryNoteController = async (req, res, next) => {
  try {
    // Obtener el id del albaran de la URL.
    const deliveryNote_id = req.params.deliveryNote_id;

    // Verifico si esta cancelado
    const deleteDeliveryNote = await selectDeliveryNoteService(deliveryNote_id);

    // Respondemos al albaran.
    res.status(200).send({
      status: 'ok',
      data: deleteDeliveryNote,
    });
  } catch (error) {
    next(error);
  }
};
