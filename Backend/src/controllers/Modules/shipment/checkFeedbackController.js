import { selectShipmentByrefSH } from '../../../models/Modules/shipment/selectShipmentByTrackingNumberModel.js';
import { feedbackShipmentModel } from '../../../models/Modules/shipment/feedbackShipmentModel.js';

export const checkFeedbackController = async (req, res, next) => {
  try {
    const ref_SH = req.params.ref_SH;
    const shipment = await selectShipmentByrefSH(ref_SH);

    if (!shipment) {
      return res.status(404).json({ error: 'Envío no encontrado' });
    }

    const feedbackExists = await feedbackShipmentModel.checkFeedbackExists(shipment.id_shipment);

    res.status(200).json({ feedbackExists });
  } catch (error) {
    console.error('Error in checkFeedbackController:', error);
    next(error);
  }
};
