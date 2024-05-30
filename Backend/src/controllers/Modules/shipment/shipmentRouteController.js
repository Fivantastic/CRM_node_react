import { getModuleShipmentModel } from '../../../models/Modules/getModuleShipmentRouteModel.js';

export const shipmentRouteController = async (req, res, next) => {
  try {
    const shipments = await getModuleShipmentModel();
    res.status(200).json({ success: true, data: shipments });
  } catch (error) {
    next(error);
  }
};