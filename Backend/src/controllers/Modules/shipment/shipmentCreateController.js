import { newShipmentSchema } from '../../../schemas/Modules/shipment/newShipmentSchema.js';
import { newShipmentService } from '../../../services/Modules/shipment/newshipmentService.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';

export const shipmentCreateController = async (req, res, next) => {
  try {
    const { customer_id, address_id, deliveryNote_id, additional_notes } =
      req.body;

    // Valido el body
    await validateSchemaUtil(newShipmentSchema, req.body);

    // Inserto en la base datos el envio
    await newShipmentService(
      customer_id,
      address_id,
      deliveryNote_id,
      additional_notes
    );

    res.status(200).send({
      status: 'ok',
      message: 'Envio realizado con exito!',
    });
  } catch (error) {
    next(error);
  }
};
