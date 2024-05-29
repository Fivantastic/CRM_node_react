import { fetchShipmentData } from '../../../models/Modules/shipment/fetchShipmentData.js';
import { invalidCredentials } from '../../error/errorService.js';
import { selectCustomerByIdModel } from '../../../models/customer/selectCustomerByIdModel.js';
import { updateShipmentStatus } from '../../../models/Modules/shipment/updateShipmentStatusModel.js';

export const closeShipmentStatusService = async (shipmentId, deliveryNote_id, role, newStatus) => {
  console.log(`Closing shipment with ID: ${shipmentId} by delivery note ID: ${deliveryNote_id} with role: ${role}`);
  
  const shipmentData = await fetchShipmentData(shipmentId);
  if (!shipmentData) {
    console.log(`Shipment with ID: ${shipmentId} does not exist`);
    invalidCredentials('El envío no existe');
  }

  if (shipmentData.deliveryNote_id !== deliveryNote_id && role !== 'admin') {
    console.log(`Delivery Note ID: ${deliveryNote_id} with role: ${role} does not have permission to modify shipment ID: ${shipmentId}`);
    invalidCredentials('No tienes permiso para modificar este envío');
  }

  console.log(`Updating status of shipment ID: ${shipmentId} to ${newStatus}`);
  await updateShipmentStatus(shipmentId, newStatus);

  if (newStatus === 'delivered') {
    const customer = await selectCustomerByIdModel(shipmentData.customer_id);
    const email = customer.email;
    console.log(`Email for delivery: ${email}, ref_SH: ${shipmentData.ref_SH}`);
    return { email, ref_SH: shipmentData.ref_SH };
  }

  return null;
};
