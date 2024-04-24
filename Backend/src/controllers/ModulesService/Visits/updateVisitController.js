import { updateVisitSchema } from "../../../schemas/newVisitSchema.js";
import { validateSchemaUtil } from "../../../utils/validateSchemaUtil.js";
import { updateVisitService } from "../../../services/updateVisitService.js";


export const updateVisitController = async (req, res, next) => {
    try {
        //obtenemos el id_user del token
        const userId = req.user.id_user;

        // Obtenemos el id de la visita
        const visitId = req.params.visitId;

        // Obtenemos del body la modificación del cliente ha quien vamos a visitar y la fecha de la visita.
        const { id_customer, id_user, visit_date, observations } = req.body;

        // Validamos el body
        await validateSchemaUtil(updateVisitSchema, req.body);

        await updateVisitService(visitId, id_user, id_customer, visit_date, observations);


        res.send({
            status: 'ok',
            message: 'Visita actualizada'
        });
    } catch (error) {
        next(error);
    }
}