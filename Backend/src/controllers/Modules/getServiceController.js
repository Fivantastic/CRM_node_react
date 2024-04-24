import { selectModuleDetailModel } from '../../models/Modules/selectModuleDetailModel.js';

export const getModuleController = async (req, res, next) => {
  try {
    // Obtenemos el id del servicio.
    const moduleId = req.params.moduleId;

    // Obtengo el servicio de la base de datos
    const service = await selectModuleDetailModel(moduleId);

    // Devolvemos el servicio
    res.send({
      status: 'ok',
      message: 'Detalle del modulo',
      data: { service },
    });
  } catch (error) {
    next(error);
  }
};
