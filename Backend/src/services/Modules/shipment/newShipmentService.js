import { insertShipmentModel } from '../../../models/Modules/shipment/insertShipmentModel.js';
import { selectCustomerByIdModel } from '../../../models/customer/selectCustomerByIdModel.js';
import { selectAddressByIdModel } from '../../../models/Modules/shipment/selectAddressByIdModel.js';
import { selectDeliveryNoteByIdModel } from '../../../models/Modules/shipment/selectDeliveryNoteByIdModel.js';
import { notFoundError } from '../../error/errorService.js';
import crypto from 'crypto';
import { getMaxReference5Digits } from '../../../models/getMaxReference.js';
import { generateReference5DigitsFromRef } from '../../../utils/generateReference5Digits.js';

export const newShipmentService = async ({
  customer_id, address_id, deliveryNote_id, additional_notes,
  product_name, product_quantity, shipment_status
}) => {
  // Verificar si el cliente existe
  const customer = await selectCustomerByIdModel(customer_id);
  if (!customer) {
    throw notFoundError('Customer not found');
  }

  // Verificar si la dirección existe
  const address = await selectAddressByIdModel(address_id);
  if (!address) {
    throw notFoundError('Address not found');
  }

  // Verificar si la nota de entrega existe
  const deliveryNote = await selectDeliveryNoteByIdModel(deliveryNote_id);
  if (!deliveryNote) {
    throw notFoundError('Delivery Note not found');
  }

  // Crear el id del envío
  const shipmentId = crypto.randomUUID();

  // Obtenemos la referencia máxima de la tabla Shipments
  const maxRef = await getMaxReference5Digits('Shipments', 'ref_SH');

  // Generamos la nueva referencia de Shipments
  const ref = generateReference5DigitsFromRef('SH', maxRef);

  // Crear el envío y actualizar el stock del producto
  try {
    const result = await insertShipmentModel({
      shipmentId, ref, customer_id, address_id, product_name, 
      product_quantity, shipment_status, additional_notes
    });

    return { message: 'Shipment created successfully', details: result };
  } catch (error) {
    throw new Error(`Error creating shipment: ${error.message}`);
  }
};
