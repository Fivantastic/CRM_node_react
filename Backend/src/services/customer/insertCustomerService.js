import { insertCustomerModel } from '../../models/customer/insertCustomerModel.js';
import { insertAddressCustomerModel } from '../../models/customer/insertAddressCustomerModel.js';
import { selectCustomerByEmailModel } from '../../models/customer/selectCustomerByEmailModel.js';
import { emailAlreadyRegisteredError } from '../error/errorService.js';

export const insertCustomerService = async (body) => {
  try {
    // Obtener los datos del body.
    const { name, email, phone, company_name, NIF } = body;

    // Buscamos en la base de datos algún usuario con ese email.
    const existCustomer = await selectCustomerByEmailModel(email);

    // Si existe un usuario con ese email, lanzamos un error.
    if (existCustomer) {
      emailAlreadyRegisteredError();
    }

    // Creamos una id para el usuario.
    const id_customer = crypto.randomUUID();

    // Creamos una id para la direccion
    const id_address = crypto.randomUUID();

    // Insertamos la direccion en la base de datos.
    await insertAddressCustomerModel(id_address);

    // Insertamos el usuario en la base de datos.
    const response = await insertCustomerModel(
      id_customer,
      name,
      email,
      phone,
      company_name,
      NIF,
      id_address
    );

    return response;
  } catch (error) {
    // Manejar el error aquí.
    console.error('Error al insertar cliente:', error);
    throw error;
  }
};
