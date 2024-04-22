import { validateSchemaUtil } from "../../utils/validateSchemaUtil";
import { newProductSchema } from "../../schemas/newProductSchema";
// Falta algún import?

export const updateProductController = async (req, res, next) => {
   try{ 
    //Validar el body con joi.
    await validateSchemaUtil(newProductSchema, req.body);

    // Obtenemos el id del producto.
    const productId = req.params.productId;

    // Actualizamos el Producto en la base de datos.
    const product = await updateProduct(productId, req.body);

   res.send({
    status: 'ok',
    message: 'Product update',
    data: { product },
   });
} catch (error) {
    next(error);
};
}
