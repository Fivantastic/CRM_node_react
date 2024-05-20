import { moduleListDetailService } from '../../services/Modules/moduleListDetailService.js';

export const getModuleListController = async (req, res, next) => {
  try {
    // Obtengo los modulos de la base de datos
    const services = await moduleListDetailService();

    // Devolvemos los modulos
    res.send({
      status: 'ok',
      message: 'Lista del modulo',
      data: services,
    });
  } catch (error) {
    next(error);
  }
};
