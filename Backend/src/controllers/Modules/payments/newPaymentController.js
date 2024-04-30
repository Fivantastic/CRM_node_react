import { validateSchemaUtil } from "../../../utils/validateSchemaUtil.js";
import { newPaymentSchema } from "../../../schemas/Modules/payments/newPaymentSchema.js";
import { newPaymentService } from "../../../services/Modules/payments/insertPaymentService.js";


export const newPaymentController = async (req, res, next) => {
    try { 
        // Validar el body
        await validateSchemaUtil(newPaymentSchema, req.body)

        //TODO Insertar en BBDD
        await newPaymentService(req.body)

        // Enviar Respuesta
        res.send({
            status: 'ok',
            message: 'Pago creado correctamente'
        })
    } catch (error) {
        next(error)
    }
};
