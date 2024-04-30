import { updateShipmentSchema } from '../../../schemas/Modules/shipment/updateShipmentSchema.js';
import { updateShipmentService } from '../../../services/Modules/shipment/updateShipmentService.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';

export const shipmentUpdateController = async (req, res, next) => {
  try {
    // Validar el body con Joi.
    await validateSchemaUtil(updateShipmentSchema, req.body);

    // Obtenemos el id del envio.
    const shipmentId = req.params.shipmentId;

    // Actualizamos el envio en la base de datos.
    const shipment = await updateShipmentService(shipmentId, req.body);

    // Devolvemos el envio actualizado.
    res.send({
      status: 'ok',
      message: 'Envio actualizado',
      data: { shipment },
    });
  } catch (error) {
    next(error);
  }
};
