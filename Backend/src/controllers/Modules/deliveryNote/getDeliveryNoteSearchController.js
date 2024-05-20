import { getDeliveryNoteSearchService } from '../../../services/Modules/deleveryNote/getDeliveryNoteSearchService.js';

export const getDeliveryNoteSearchController = async (req, res, next) => {
  try {
    // Recibimos la cadena de búsqueda desde la consulta
    const searchTerm = req.query.searchTerm;

    // Llamamos al servicio
    const response = await getDeliveryNoteSearchService(searchTerm);

    res.status(200).json({
      status: 'ok',
      message: 'Delivery Notes',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
