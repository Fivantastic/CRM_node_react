import { validateSchemaUtil } from "../../utils/validateSchemaUtil.js";
import { newProductSchema } from "../../schemas/product/newProductSchema.js";
import { updateProductService } from "../../services/product/selectProductByIdModel.js";

export const updateProductController = async (req, res, next) => {
   try{ 
    //Validar el body con joi.
    await validateSchemaUtil(newProductSchema, req.body);

    // Obtenemos el id del producto.
    const id_product = req.params.id_product;
    console.log(id_product);
    // Actualizamos el Producto en la base de datos.
    const product = await updateProductService(id_product, req.body);

   res.send({
    status: 'ok',
    message: 'Product update',
    data: { product },
   });
} catch (error) {
    next(error);
};
}
