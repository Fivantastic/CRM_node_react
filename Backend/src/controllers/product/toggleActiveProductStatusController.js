import { toggleProductActivationService } from "../../services/product/toggleProductActivationService.js";


export const toggleActiveProductStatusController = async (req, res, next) => {
    try {
        // Obtenemos el id del usuario.
        const productId =  req.body.id;

        // Desactivamos al usuario en la base de datos.
        const product = await toggleProductActivationService(productId)

        // Devolvemos el usuario actualizado.
        const isActive = product.active === '1' ? true : false;
        const message = `Estado del producto cambiado a: ${isActive ? 'Activo' : 'Inactivo'} `

        res.send({
            status: 'ok',
            isActive,
            message
        });
    } catch (error) {
        next(error);
    }
}
