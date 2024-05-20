import { selectPendingDeliveryNotesModel } from '../../../models/Modules/shipment/selectPendingDeliveryNotesModel.js';

export const getPendingDeliveryNotesService = async () => {
  return await selectPendingDeliveryNotesModel();
};

