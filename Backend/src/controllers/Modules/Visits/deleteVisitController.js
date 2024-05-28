import { selectIdVisitByIdService } from "../../../services/Modules/visits/selectIdVisitByIdService.js";
import { invalidCredentials } from "../../../services/error/errorService.js";
import { deleteVisitModel } from "../../../models/Modules/visits/deleteVisitModel.js";
import { deleteModuleByIdVisitModel } from "../../../models/Modules/visits/deleteModuleByIdVisitModel.js";
import { selectmoduleByIdVisitModel } from "../../../models/Modules/visits/selectmoduleByIdVisitModel.js";



export const deleteVisitController = async (req, res, next) => {
    try {
        const visitId = req.params.visitId;
        console.log(visitId);
        
        const visit = await selectIdVisitByIdService(visitId);

        if(visit.id_visit !== visitId) {
            invalidCredentials('No se encontró el identificador de la visita');
        } else{
            //Obtenemos el id del modulo referente a la visita
            const module = await selectmoduleByIdVisitModel(visit.id_visit);

            //Eliminamos el modulo
            await deleteModuleByIdVisitModel(module.id_module);

            //Eliminamos la visita
            await deleteVisitModel(visit.id_visit);
        }
        res.status(200).json({
            status: 'ok',
            message: 'La visita ha sido eliminada',
        });
    } catch (error) {
        next(error);
    }
}