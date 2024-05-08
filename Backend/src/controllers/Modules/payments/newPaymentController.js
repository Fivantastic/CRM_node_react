import { validateSchemaUtil } from "../../../utils/validateSchemaUtil.js";
import { newPaymentSchema } from "../../../schemas/Modules/payments/newPaymentSchema.js";
import { newPaymentService } from "../../../services/Modules/payments/insertPaymentService.js";


export const newPaymentController = async (req, res, next) => {
    try { 
        // Validar el body
        await validateSchemaUtil(newPaymentSchema, req.body)

        // Insertar en BBDD
        const data = await newPaymentService(req.body)
        console.log(data);

        // Enviar Respuesta
        res.send({
            status: 'ok',
            message: 'Pago creado correctamente',
            data
        })
    } catch (error) {
        next(error)
    }
};
