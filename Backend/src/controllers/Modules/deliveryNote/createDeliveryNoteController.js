import { insertDeliveryNote } from '../../../models/Modules/deliveryNote/insertDeliveryNote.js'; 
import { validateSchemaUtil } from '../../../utils/validateSchemaUtil.js'; 
import { createDeliveryNoteSchema } from '../../../schemas/Modules/deliveryNote/createDeliveryNoteSchema.js'; 
import { success, errorResponse } from '../../../utils/success.js'; 
import { getDBPool } from '../../../db/getPool.js'; 

export const createDeliveryNoteController = async (req, res, next) => {
  const pool = getDBPool(); // Obtener la conexión a la base de datos

  try {
    // Validar el cuerpo de la solicitud
    await validateSchemaUtil(createDeliveryNoteSchema, req.body);

    const {
      sale_id,
      deliverer_id,
      delivery_status,
      address_id,
      saleProduct_id,
    } = req.body;

    // Verificar si el producto tiene stock suficiente
    const [product] = await pool.query(
      `SELECT stock FROM Products WHERE id_product = ?`,
      [saleProduct_id]
    );
    const productStock = product[0]?.stock;

    if (productStock <= 0) {
      // Stock insuficiente, devuelve un error
      res
        .status(400)
        .json(
          errorResponse({ message: 'Stock insuficiente para el producto' })
        );
      return;
    }

    // Insertar la nota de entrega con los datos proporcionados
    const noteId = await insertDeliveryNote(
      sale_id,
      deliverer_id,
      delivery_status,
      address_id,
      saleProduct_id
    );

    // Responder con éxito y el ID del nuevo albarán
    res.json(success({ message: 'Albarán creado con éxito', noteId }));
  } catch (error) {
    next(error); // Manejo de errores
  }
};
