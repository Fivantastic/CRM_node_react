import { closeShipmentStatusService } from '../../../services/Modules/shipment/closeShipmentStatusService.js';
import { sendEmailForShipmentDelivery } from '../../../services/email/emailService.js';

export const closeShipmentStatusController = async (req, res, next) => {
  try {
    const { id_user, role } = req.user;
    const { shipmentId } = req.params; // Obtener shipmentId de los parámetros de la ruta
    const { newStatus } = req.body; // Obtener newStatus del cuerpo de la solicitud

    console.log(`Request to close shipment. Shipment ID: ${shipmentId}, New Status: ${newStatus}, Delivery Note ID: ${id_user}, Role: ${role}`);

    // Cerramos el envío y obtenemos el email del cliente si es necesario
    const { email, trackingNumber } = await closeShipmentStatusService(shipmentId, id_user, role, newStatus);

    // Enviar email al cliente si el envío se entrega
    if (newStatus === 'delivered' && email) {
      await sendEmailForShipmentDelivery(trackingNumber, email);
    }

    res.send({
      status: 'ok',
      message: `Envío ${newStatus === 'delivered' ? 'entregado y email enviado' : 'actualizado'} con éxito`,
    });
  } catch (error) {
    next(error);
  }
};
