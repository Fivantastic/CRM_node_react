import { updateShipmentSchema } from '../../../schemas/Modules/shipment/updateShipmentSchema.js';
import { updateShipmentService } from '../../../services/Modules/shipment/updateShipmentService.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';

export const shipmentUpdateController = async (req, res, next) => {
  try {
    // Validar el body con Joi.
    await validateSchemaUtil(updateShipmentSchema, req.body);

    // Obtenemos el id del envío.
    const shipmentId = req.params.shipmentId;

    // Actualizamos el envío en la base de datos.
    const shipment = await updateShipmentService(shipmentId, req.body);

    // Devolvemos el envío actualizado.
    res.send({
      status: 'ok',
      message: 'Envío actualizado',
      data: shipment ,
    });
  } catch (error) {
    next(error);
  }
};
