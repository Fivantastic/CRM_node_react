import { getModuleDeliveryNoteModel } from '../../models/Modules/getModuleDeliveryNoteModel.js';
import { getModuleSalesModel } from '../../models/Modules/getModuleSalesModel.js';
import { getModuleVisitModel } from '../../models/Modules/getModuleVisitModel.js';

export const searchModulesController = async (req, res, next) => {
  try {
    // Obtengo el rol del usuario
    const userRole = req.user?.role;
    const searchTerm = req.query.search;
    console.log(searchTerm);

    let responseData = {};

    console.log(userRole);
    // Busco los datos en la base de datos
    const searchSale = await getModuleSalesModel(searchTerm);
    const searchVisit = await getModuleVisitModel(searchTerm);
    const searchDeliveryNote = await getModuleDeliveryNoteModel(searchTerm);

    // Muestro la info por su respectivo rol
    if (userRole === 'admin') {
      responseData = {
        sales: searchSale,
        visits: searchVisit,
        deliveryNotes: searchDeliveryNote,
      };
    } else if (userRole === 'salesAgent') {
      responseData = {
        visits: searchVisit,
        sales: searchSale,
      };
    } else if (userRole === 'deliverer') {
      responseData = {
        deliveryNotes: searchDeliveryNote,
      };
    } else {
      responseData = {
        deliveryNotes: 'No tienes permisos. !',
      };
    }

    // Responder con los modulos
    res.status(200).send({
      status: 'ok',
      message: 'Detalle de los modulos',
      data: responseData,
    });
  } catch (error) {
    next(error);
  }
};
