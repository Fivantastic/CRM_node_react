import { getShipmentsByDeliverer } from '../../../models/Modules/getShipmentsByDeliverer.js';

export const getShipmentsByDeliverer = async () => {
    try {
      const shipments = await getShipmentsByDeliverer();
      return shipments;
    } catch (error) {
      throw new Error('Error al obtener los envíos y repartidores');
    }
  };
