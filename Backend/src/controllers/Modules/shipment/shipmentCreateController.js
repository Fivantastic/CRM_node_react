import { newShipmentService } from '../../../services/Modules/shipment/newShipmentService.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';
import { newShipmentSchema } from '../../../schemas/Modules/shipment/newShipmentSchema.js';

export const shipmentCreateController = async (req, res, next) => {
  try {
    // Validar el cuerpo de la solicitud con el esquema
    await validateSchemaUtil(newShipmentSchema, req.body);

    const { deliveryNote_id, additional_notes } = req.body;

    // Llamar al servicio para insertar el envío
    const result = await newShipmentService( deliveryNote_id, additional_notes);

    // Enviar respuesta exitosa
    res.status(200).send({
      status: 'ok',
      message: result.message,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
