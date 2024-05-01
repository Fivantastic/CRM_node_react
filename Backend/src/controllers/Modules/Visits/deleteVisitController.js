import { deleteVisitModel } from "../../../models/Modules/visits/deleteVisitModel.js";
import { invalidCredentials } from "../../../services/error/errorService.js";
import { selectIdVisitByIdService } from "../../../services/Modules/visits/selectIdVisitByIdService.js";


export const deleteVisitController = async (req, res, next) => {
    try {
        const { visitId } = req.params;

        const id_visit = await selectIdVisitByIdService(visitId);

        if(id_visit !== visitId) {
            invalidCredentials('No se encontró el identificador de la visita');
        } else{
            await deleteVisitModel(visitId);
        }
        res.status(200).json({
            status: 'ok',
            message: 'La visita ha sido eliminada',
        });
    } catch (error) {
        next(error);
    }
}