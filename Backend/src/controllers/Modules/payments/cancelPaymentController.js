import { validateSchemaUtil } from "../../../utils/validateSchemaUtil.js";
import { cancelPaymentSchema } from "../../../schemas/Modules/payments/newPaymentSchema.js";
import { changePaymentStatusModel } from "../../../models/Modules/payments/changePaymentStatusModel.js";

export const cancelPaymentController = async (req, res, next) => {
    try { 
        // Validar los datos
        await validateSchemaUtil(cancelPaymentSchema, req.body);

        const { payment_id, new_status } = req.body;

        // Actualizar el pago
        await changePaymentStatusModel(payment_id, new_status)

        res.send({
            status:'ok',
            message: 'Estado del pago actualizado'
        })
    } catch (error) {
        next(error);
    }
};