import { feedbackShipmentModel } from '../../../models/Modules/shipment/feedbackShipmentModel.js';
import { selectShipmentByTrackingNumber } from '../../../services/Modules/shipment/selectShipmentByTrackingNumberService.js';

export const feedbackShipmentService = async (body, trackingNumber) => {
  const { rating_shipment, comment_shipment } = body;

  // Obtener el id del envío por el número de seguimiento
  const shipment = await selectShipmentByTrackingNumber(trackingNumber);

  // Insertar el feedback en la base de datos
  const response = await feedbackShipmentModel(
    shipment.id_shipment,
    rating_shipment,
    comment_shipment
  );

  return response;
};
