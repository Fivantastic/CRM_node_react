import { newCustomerSchema } from '../../schemas/newCustomerSchema.js';
import { insertCustomerService } from '../../services/insertCustomerService.js';
import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js';

export const newCustomerControllers = async (req, res, next) => {
  try {
    // Obtenemos el cuerpo de la petición
    const { nombre, email, telefono } = req.body;

    // Validamos el body
    await validateSchemaUtil(newCustomerSchema, req.body);

    // Insertamos el cliente en la base de datos
    await insertCustomerService(nombre, email, telefono);

    // Respondemos al cliente
    res.status(201).send({
      status: 'ok',
      message: 'El cliente ha sido creado exitosamente...',
    });
  } catch (error) {
    next(error);
  }
};
