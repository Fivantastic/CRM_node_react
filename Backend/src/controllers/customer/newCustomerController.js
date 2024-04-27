import { newCustomerSchema } from '../../schemas/customer/newCustomerSchema.js';
import { insertCustomerService } from '../../services/customer/insertCustomerService.js';
import { success } from '../../utils/success.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const newCustomerController = async (req, res, next) => {
  try {
    // Obtenemos el cuerpo de la petición
    const { name, email, phone } = req.body;

    // Validamos el body
    await validateSchemaUtil(newCustomerSchema, req.body);

    // Insertamos el cliente en la base de datos
    const response = await insertCustomerService(name, email, phone);

    // Respondemos al cliente
    res.status(201).send(
      success( response )
    );
  } catch (error) {
    next(error);
  }
};
