import { notFoundError } from '../services/error/errorService.js';
import { selectSaleProductByIdService } from '../services/product/selectSaleProductByIdService.js';

export const productExist = async (req, res, next) => {
  try {
    // Obtener el id del servicio de la URL.
    const productId = req.params.productId;

    // Comprobar si existe un producto con el id proporcionado.
    const product = await selectSaleProductByIdService(productId);

    // Si no se encuentra el producto, lanzar un error.
    if (product) {
      notFoundError('Producto');
    }

    // Pasar el control al siguiente middleware.
    next();
  } catch (error) {
    next(error);
  }
};
