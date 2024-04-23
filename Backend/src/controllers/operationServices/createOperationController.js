import { validateSchemaUtil } from '../../utils/validateSchemaUtil.js'; // Validación del esquema
import { success } from '../../utils/success.js'; // Respuesta de éxito
import { createOperationSchema } from '../../schemas/operationSchema.js';// Esquema para creación de operaciones
import { insertOperation } from '../../models/customer/operationsModel.js'; // Modelo para insertar operaciones


export const createOperationController = async (req, res, next) => {
  try {
    // Validar el cuerpo de la solicitud usando el esquema
    await validateSchemaUtil(createOperationSchema, req.body);
    
    // Obtener los datos para crear la operación
    const { user_id, product_id, service_id, customer_id, type, operation_status } = req.body;

    // Insertar la operación en la base de datos
    const operationId = await insertOperation(user_id, product_id, service_id, customer_id, type, operation_status);

    // Responder con éxito
    res.json(success({ message: 'Operación creada con éxito', operationId }));
  } catch (error) {
    next(error); // Manejo de errores
  }
};
