import { insertShipmentModel } from '../../../models/Modules/shipment/insertShipmentModel.js';
import { selectDeliveryNoteByIdModel } from '../../../models/Modules/shipment/selectDeliveryNoteByIdModel.js';
import { notFoundError } from '../../error/errorService.js';
import crypto from 'crypto';
import { getMaxReference5Digits } from '../../../models/getMaxReference.js';
import { generateReference5DigitsFromRef } from '../../../utils/generateReference5Digits.js';
import { updateDeliveryNoteStatusModel } from '../../../models/Modules/shipment/updateDeliveryNoteStatusModel.js';

export const newShipmentService = async ({ deliveryNote_id, additional_notes, shipment_status }) => {
  // Verificar si la nota de entrega existe y obtener los datos necesarios
  const deliveryNote = await selectDeliveryNoteByIdModel(deliveryNote_id);
  if (!deliveryNote) {
    throw notFoundError('Delivery Note not found');
  }

  const { customer_id, address_id } = deliveryNote;

  // Crear el id del envío
  const shipmentId = crypto.randomUUID();

  // Obtener la referencia máxima de la tabla Shipments
  const maxRef = await getMaxReference5Digits('Shipments', 'ref_SH');

  // Generar la nueva referencia de Shipments
  const ref = generateReference5DigitsFromRef('SH', maxRef);

  // Actualizar el estado de la nota de entrega a "delivering"
  await updateDeliveryNoteStatusModel(deliveryNote_id, 'delivering'); // Asegúrate de que el ID correcto se pasa aquí

  // Crear el envío
  try {
    const result = await insertShipmentModel({
      shipmentId, ref, customer_id, address_id, deliveryNote_id, shipment_status, additional_notes,
    });

    return { message: 'Shipment created successfully', id_shipment: shipmentId, details: result };
  } catch (error) {
    throw new Error(`Error creating shipment: ${error.message}`);
  }
};
