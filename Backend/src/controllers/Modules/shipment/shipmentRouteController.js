import { getModuleShipmentModel } from '../../../models/Modules/getModuleShipmentRouteModel.js';

export const shipmentRouteController = async (req, res, next) => {
  try {
    const shipments = await getModuleShipmentModel();
    res.status(200).json({ success: true, data: shipments });
  } catch (error) {
    console.error('Error al obtener la hoja de ruta de los repartidores:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};