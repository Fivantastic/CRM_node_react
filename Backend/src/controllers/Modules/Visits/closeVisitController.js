import { closeVisitService } from "../../../services/Modules/visits/closeVisitService.js";
import { sendEmailForVisitFeedback } from "../../../services/email/emailService.js";


export const closeVisitController = async (req, res, next) => {
    try {
        // Obtenemos el id de la visita de params
        const { visitId } = req.params;
        // Obtenemos el id_user del token
        const { id_user } = req.user;
  
        // Cerramos la visita y obtenemos el email del cliente
        const email = await closeVisitService(visitId, id_user);

        console.log('email: ', email);
        // Enviar email al cliente
        await sendEmailForVisitFeedback(visitId ,email);
        

        res.send ({
            status: 'ok',
            message: `Visita cerrada exitosamente y email enviado a ${email}` 
        })
    } catch (error) {
        next(error);
    }
}