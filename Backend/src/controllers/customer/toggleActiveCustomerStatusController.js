import { toggleCustomerActivationService } from "../../services/customer/toggleCustomerActivationService.js";

export const toggleActiveCustomerStatusController = async (req, res, next) => {
    try {
        console.log('llega a toggleActiveCustomerStatusController');
        const id_customer = req.body.id;
        const customer = await toggleCustomerActivationService(id_customer)
        const isActive = customer.active === '1' ? true : false;
        const message = `Estado del cliente cambiado a: ${isActive ? 'Activo' : 'Inactivo'}`
        res.send({
            status: 'ok',
            isActive,
            message
        });
    } catch (error) {
        next(error);
    }
}
