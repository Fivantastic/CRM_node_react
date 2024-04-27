import { deleteCustomerModel } from "../../models/customer/deleteCustomerModel.js";
import { deleteCustomerSchema } from "../../schemas/customer/newCustomerSchema.js";
import { success } from "../../utils/success.js";
import { validateSchemaUtil } from "../../utils/validateSchemaUtil.js";

export const deleteCustomerController = async (req, res, next) => {
    try {
        // Validar el body con Joi.
        await validateSchemaUtil(deleteCustomerSchema, req.body);

        // Obtener el id del cliente de la URL.
        const customerId = req.params.customerId

        // Eliminar el cliente de la base de datos.
        const deleteCustomer = await deleteCustomerModel(customerId)

        // Respondemos al cliente.
        res.status(200).send(
            success(deleteCustomer)
        );
    } catch (error) { 
        next(error);
    }
}