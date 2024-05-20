import { getPendingDeliveryNotesService } from '../../../services/Modules/shipment/getPendingDeliveryNotesService.js';

export const getPendingDeliveryNotesController = async (req, res, next) => {
  try {
    const pendingNotes = await getPendingDeliveryNotesService();
    res.status(200).send({
      status: 'ok',
      data: pendingNotes,
    });
  } catch (error) {
    next(error);
  }
};