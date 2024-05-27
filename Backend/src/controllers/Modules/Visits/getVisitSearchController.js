import { getVisitSearchService } from '../../../services/Modules/visits/getVisitSearchService.js';

export const getVisitSearchController = async (req, res, next) => {
  try {
    // Recibimos la cadena completa desde la consulta
    const searchTerm = req.query.searchTerm;
    // Dividimos la cadena para obtener el término de búsqueda real

    // const searchTerm = queryString.split(' ')[1];

    // Llamamos al servicio
    const response = await getVisitSearchService(searchTerm);

    res.status(200).json({
      status: 'ok',
      message: response.message,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
