import { selectProductById } from "../../models/products/selectProductById.js";
import { toggleProductActiveModel } from "../../models/products/toggleProductStatusModel.js";
import { notFoundError } from "../error/errorService.js";


export const toggleProductActivationService = async (productId) => {
    // Comprobamos que exista el producto
    const product = await selectProductById(productId);

    if (!product) {
        notFoundError('Product');
    }

    // Condicional: si está activo desactivar, y viceversa
    const newStatus = product.active === 0 ? true : false

    // Actualizar el producto en la base de datos
    await toggleProductActiveModel(productId, newStatus); 
    
    // Obtener el producto actualizado
    const updatedProduct = await selectProductById(productId);

    // Devolver el producto actualizado
    return updatedProduct;
}