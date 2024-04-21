import { selectServiceDetailModel } from '../../models/services/selectServiceDetailModel.js';

export const getServiceController = async (req, res, next) => {
  try {
    // Obtenemos el id del servicio.
    const serviceId = req.params.serviceId;

    // Obtengo el servicio de la base de datos
    const service = await selectServiceDetailModel(serviceId);

    // Devolvemos el servicio
    res.send({
      status: 'ok',
      message: 'Detalle del servicio',
      data: { service },
    });
  } catch (error) {
    next(error);
  }
};
