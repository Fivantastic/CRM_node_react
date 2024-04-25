import { feedbackVisitSchema } from "../../../schemas/Modules/visits/visitSchema.js";
import { validateSchemaUtil } from "../../../utils/validateSchemaUtil.js";
import { feedbackVisitService } from "../../../services/Modules/visits/feedbackVisitService.js";


export const feedbackVisitController = async (req, res, next) => {
    try {
        //Obtenemos el id de la visita
        const { visitId } = req.params;

        //validamos con el joi
        await validateSchemaUtil(feedbackVisitSchema, req.body);

        //Llamamos al servicio
        const response = await feedbackVisitService(visitId, req.body);

        res.status(200).json({
            status: 'ok',
            message: response.message
        });

    } catch (error) {
        next(error);
    }
}