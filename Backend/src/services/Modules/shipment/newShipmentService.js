import { insertShipmentModel } from '../../../models/Modules/shipment/insertShipmentModel.js';
import { selectAddressByIdModel } from '../../../models/Modules/shipment/selectAddressByIdModel.js';
import { selectDeliveryNoteByIdModel } from '../../../models/Modules/shipment/selectDeliveryNoteByIdModel.js';
import { selectCustomerByIdModel } from '../../../models/customer/selectCustomerByIdModel.js';
import { notFoundError } from '../../error/errorService.js';

export const newShipmentService = async (
  customer_id,
  address_id,
  deliveryNote_id,
  additional_notes
) => {
  // compruebo si existen
  const customer = await selectCustomerByIdModel(customer_id);
  if (!customer) {
    notFoundError('Customer');
  }

  const address = await selectAddressByIdModel(address_id);
  if (!address) {
    notFoundError('Address');
  }

  const deliveryNote = await selectDeliveryNoteByIdModel(deliveryNote_id);
  if (!deliveryNote) {
    notFoundError('DeliveryNote');
  }

  // Creo el id del envio
  const shipmentId = crypto.randomUUID();
  console.log('Id de envio', shipmentId);

  // Creao el numero del traking
  const tracking_number = crypto.randomUUID();
  console.log('traking', tracking_number);

  // Inserto en la base de datos el envio
  await insertShipmentModel(
    shipmentId,
    customer_id,
    address_id,
    deliveryNote_id,
    tracking_number,
    additional_notes
  );
};
