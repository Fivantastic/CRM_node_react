import { newVisitSchema } from "../../../schemas/Modules/visits/visitSchema.js";
import { sendConfirmationVisitEmail } from "../../../services/email/emailService.js";
import { insertNewVisitService } from "../../../services/Modules/visits/insertNewVisitService.js";
import { validateSchemaUtil } from "../../../utils/validateSchemaUtil.js";


export const newVisitController = async (req, res, next) => {
    try {
        //obtenemos el id_user del token
        const user_id = req.user.id_user;

        // Obtenemos del body el cliente ha quien vamos a visitar y la fecha de la visita.
        const { id_customer, visit_date, observations } = req.body;

        // Validamos el body
        await validateSchemaUtil(newVisitSchema, req.body);

        const { customer, Address } = await insertNewVisitService(user_id, id_customer, visit_date, observations);

        //Extraer los datos del cliente
        const { name, email } = customer;

        // Enviar correo electrónico de bienvenida
        await sendConfirmationVisitEmail(name, email, visit_date );

        // Devolvemos el usuario actualizado.
        res.send({
            status: 'ok',
            message: 'Visita creada exitosamente',
            data: { customer, Address }
        });
    } catch (error) {
        next(error);
    }
}