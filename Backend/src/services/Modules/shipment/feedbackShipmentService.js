import { feedbackShipmentModel } from '../../../models/Modules/shipment/feedbackShipmentModel.js';
import { selectShipmentByrefSH } from '../../../models/Modules/shipment/selectShipmentByTrackingNumberModel.js';

export const feedbackShipmentService = async (body, ref_SH) => {
  const { rating_module, rating_comment } = body;

  // Obtener el id del envío por el número de referencia del envío
  const shipment = await selectShipmentByrefSH(ref_SH);

  console.log('Resultado de la consulta del número de referencia:', shipment);

  // Actualizar el feedback en la base de datos
  const response = await feedbackShipmentModel.updateFeedback(
    shipment.id_shipment,
    rating_module,
    rating_comment
  );

  return response;
};
