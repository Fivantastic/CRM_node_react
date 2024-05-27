import { selectShipmentByTrackingNumberModel } from '../../../models/Modules/shipment/selectShipmentByTrackingNumberModel.js';

export const selectShipmentByTrackingNumber = async (trackingNumber) => {
  return await selectShipmentByTrackingNumberModel(trackingNumber);
};
