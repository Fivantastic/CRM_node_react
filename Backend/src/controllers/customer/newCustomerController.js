import { newCustomerSchema } from '../../schemas/customer/newCustomerSchema.js';
import { insertCustomerService } from '../../services/customer/insertCustomerService.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const newCustomerControllers = async (req, res, next) => {
  try {
    // Obtenemos el cuerpo de la petición
    const { name, email, phone } = req.body;

    // Validamos el body
    await validateSchemaUtil(newCustomerSchema, req.body);

    // Insertamos el cliente en la base de datos
    await insertCustomerService(name, email, phone);

    // Respondemos al cliente
    res.status(201).send({
      status: 'ok',
      message: 'El cliente ha sido creado exitosamente...',
    });
  } catch (error) {
    next(error);
  }
};
