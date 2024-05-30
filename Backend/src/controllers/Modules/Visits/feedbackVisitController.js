import { feedbackVisitSchema } from '../../../schemas/Modules/visits/visitSchema.js';
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js';
import { feedbackVisitService } from '../../../services/Modules/visits/feedbackVisitService.js';
import { feedbackVisitCheckService } from './feedbackVisitChekService.js';

export const feedbackVisitController = async (req, res, next) => {
  try {
    //validamos con el joi
    await validateSchemaUtil(feedbackVisitSchema, req.body);

    const ref_VT = req.params.ref_VT;

    //Llamamos al servicio
    const response = await feedbackVisitService(req.body, ref_VT);

    //  Obtengo la visita
    const visit = await feedbackVisitCheckService( ref_VT);

    res.status(200).json({
      status: 'ok',
      message: response.message,
      data: { visit }
    });
  } catch (error) {
    next(error);
  }
};
