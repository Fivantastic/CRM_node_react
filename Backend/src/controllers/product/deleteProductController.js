import chalk from "chalk";
import { selectProductById } from "../../models/products/selectProductById.js";
import { deleteProductService } from "../../services/product/deleteProductService.js";

export const deleteProductController = async (req, res, next) => {
    try {
        // Obtenemos el id del producto
        const product_id = req.params.product_id;

        // Vemos si el producto existe
        const product = await selectProductById(product_id);
        if (!product){
            const error = new Error
            const errMsg = 'El id no se corresponde a ningún producto'

            error.statusCode = 404
            error.code = 'PRODUCT_NOT_FOUND'
            error.message = 'El id no se corresponde a ningún producto'
            return next(error)
        }

        // Lógica de la eliminación
        await deleteProductService(product_id)

        // Confirmación de la eliminación
        res.status(200).send({
            message: 'Producto eliminado correctamente',
            product: product.name
        });
    } catch (error) {
        // ? Error 
        console.log(error.code);
        console.log(error.message);
        next(error);
    }
};