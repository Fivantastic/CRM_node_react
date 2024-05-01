import { closedShipmentSchema } from '../../../schemas/Modules/shipment/closedShipmentSchema.js';
import { closedShipmentService } from '../../../services/Modules/shipment/closedShipmentService.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';

export const closeShipmentController = async (req, res, next) => {
  try {
    // Validar el body con Joi.
    await validateSchemaUtil(closedShipmentSchema, req.body);

    // Obtenemos el id del envio.
    const shipmentId = req.params.shipmentId;

    // Actualizamos el envio en la base de datos.
    const shipment = await closedShipmentService(shipmentId, req.body);

    // Devolvemos el envio actualizado.
    res.send({
      status: 'ok',
      message: 'Envio Completado',
      data: { shipment },
    });
  } catch (error) {
    next(error);
  }
};
