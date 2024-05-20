import { getShipmentsByDeliverer } from '../../../models/Modules/shipment/getShipmentsByDelivererModel.js';

export const shipmentByDelivererController = async (req, res, next) => {
  try {
    const shipments = await getShipmentsByDeliverer();
    res.status(200).json({ success: true, data: shipments });
  } catch (error) {
    console.error('Error al obtener los envíos y repartidores:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
