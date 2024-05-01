import { newCustomerSchema } from '../../schemas/customer/newCustomerSchema.js';
import { insertCustomerService } from '../../services/customer/insertCustomerService.js';
import { success } from '../../utils/success.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const newCustomerController = async (req, res, next) => {
  try {
    // Validamos el body
    await validateSchemaUtil(newCustomerSchema, req.body);

    // Insertamos el cliente en la base de datos
    const response = await insertCustomerService(req.body);

    // Respondemos al cliente
    res.status(201).send(
      success( response )
    );
  } catch (error) {
    next(error);
  }
};
