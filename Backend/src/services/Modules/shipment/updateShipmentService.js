import { insertNewAddressModel } from '../../../models/Modules/shipment/insertNewAddressModel.js';
import { selectShipmentByIdModel } from '../../../models/Modules/shipment/selectShipmentByIdModel.js';
import { updateShipmentModel } from '../../../models/Modules/shipment/updateShipmentModel.js';

export const updateShipmentService = async (shipmentId, body) => {
  const {
    customer_id,
    address,
    number,
    floor,
    letter_number,
    city,
    zip_code,
    country,
    deliveryNote_id,
    additional_notes,
  } = body;

  // Insertamos la nueva dirección
  const newAddressId = await insertNewAddressModel(
    address,
    number,
    floor,
    letter_number,
    city,
    zip_code,
    country
  );

  // Actualizar el envio en la base de datos.
  await updateShipmentModel(
    shipmentId,
    customer_id,
    newAddressId,
    deliveryNote_id,
    additional_notes
  );

  // Obtener el envio actualizado.
  const shipment = await selectShipmentByIdModel(shipmentId);

  // Devolver el envio actualizado.
  return shipment;
};
