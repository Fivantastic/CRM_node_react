import { getSalesSearchService } from '../../../services/Modules/sales/getSalesSearchService.js';

export const getSalesSearchController = async (req, res, next) => {
  try {
    // Recibimos la cadena completa desde la consulta
    const searchTerm = req.query.searchTerm;
    // Dividimos la cadena para obtener el término de búsqueda real

    // const searchTerm = queryString.split(' ')[1];

    // Llamamos al servicio
    const response = await getSalesSearchService(searchTerm);
    console.log('response', response);

    res.status(200).json({
      status: 'ok',
      message: response.message,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
