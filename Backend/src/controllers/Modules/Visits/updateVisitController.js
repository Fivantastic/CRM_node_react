import { updateVisitSchema } from "../../../schemas/Modules/visits/newVisitSchema.js";
import { validateSchemaUtil } from "../../../utils/validateSchemaUtil.js";
import { updateVisitService } from "../../../services/Modules/visits/updateVisitService.js";

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

        // Llamamos al servicio de actualización de visita
        const response = await updateVisitService(visitId, id_user, id_customer, visit_date, observations);

        res.status(200).json({
            status: 'ok',
            message: response.message
        });
    } catch (error) {
        next(error);
    }
}

