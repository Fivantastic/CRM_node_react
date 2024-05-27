import { deleteCustomerModel } from '../../models/customer/deleteCustomerModel.js';
import { selectCustomerByIdModel } from '../../models/customer/selectCustomerByIdModel.js';
import { success } from '../../utils/success.js';

export const deleteCustomerController = async (req, res, next) => {
  try {
    // Obtener el id del cliente.
    const id_customer = req.params.customerId;

    // Obtener el id del address asosiado
    const custumerAddress = await selectCustomerByIdModel(id_customer);
    
    // Eliminar el cliente de la base de datos.
    const deleteCustomer = await deleteCustomerModel(
      id_customer,
      custumerAddress.address_id
    );

    // Respondemos al cliente.
    res.status(200).send(success(deleteCustomer));
  } catch (error) {
    next(error);
  }
};
