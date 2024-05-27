import { feedbackShipmentSchema } from '../../../schemas/Modules/shipment/updateShipmentSchema.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';
import { feedbackShipmentService } from '../../../services/Modules/shipment/feedbackShipmentService.js';

export const shipmentFeedbackController = async (req, res, next) => {
    try {
      // Validar los datos del request body
      await validateSchemaUtil(feedbackShipmentSchema, req.body);
  
      const trackingNumber = req.params.trackingNumber;
  
      // Llamar al servicio de feedback
      const response = await feedbackShipmentService(req.body, trackingNumber);
  
      res.status(200).json({
        status: 'ok',
        message: response.message,
      });
    } catch (error) {
      next(error);
    }
  };
  
