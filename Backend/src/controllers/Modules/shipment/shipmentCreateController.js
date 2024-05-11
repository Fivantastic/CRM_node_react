// controllers/Modules/shipment/shipmentCreateController.js
import { newShipmentService } from '../../../services/Modules/shipment/newShipmentService.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';
import { newShipmentSchema } from '../../../schemas/Modules/shipment/newShipmentSchema.js';

export const shipmentCreateController = async (req, res, next) => {
  try {
    // Validar el cuerpo de la solicitud con el esquema
    await validateSchemaUtil(newShipmentSchema, req.body);

    const {
      customer_id, address_id, deliveryNote_id, additional_notes,
      product_name, product_quantity, shipment_status
    } = req.body;

    // Llamar al servicio para insertar el envío
    const result = await newShipmentService({
      customer_id, address_id, deliveryNote_id, additional_notes,
      product_name, product_quantity, shipment_status
    });

    // Enviar respuesta exitosa
    res.status(200).send({
      status: 'ok',
      message: result.message,
      details: result.details
    });
  } catch (error) {
    // Pasar el error al siguiente middleware
    console.error('Error during shipment creation:', error);
    next(error);
  }
};
