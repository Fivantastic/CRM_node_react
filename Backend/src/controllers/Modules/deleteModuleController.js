import { deleteModuleModel } from '../../models/Modules/deleteModuleModel.js';
import { success } from '../../utils/success.js';

export const deleteModuleController = async (req, res, next) => {
  try {
    // Obtener el id del cliente de la URL.
    const moduleId = req.params.moduleId;

    // Eliminar el cliente de la base de datos.
    const deleteModule = await deleteModuleModel(moduleId);

    // Respondemos al cliente.
    res.status(200).send(success(deleteModule));
  } catch (error) {
    next(error);
  }
};
