import { insertCustomerModel } from '../models/customer/insertCustomerModel.js';
import { selectCustomerByEmailModel } from '../models/customer/selectCustomerByEmailModel.js';
import { selectCustomerByUsernameModel } from '../models/customer/selectCustomerByUsernameModel.js';
import {
  emailAlreadyRegisteredError,
  usernameAlreadyRegisteredError,
} from './errorService.js';

export const insertCustomerService = async (nombre, email, telefono) => {
  try {
    // Buscamos en la base de datos algún usuario con ese nombre.
    let existCustomer = await selectCustomerByUsernameModel(nombre);

    // Si existe un usuario con ese nombre, lanzamos un error.
    if (existCustomer) {
      usernameAlreadyRegisteredError();
    }
    console.log('No hay cliente con ese nombre');

    // Buscamos en la base de datos algún usuario con ese email.
    existCustomer = await selectCustomerByEmailModel(email);

    // Si existe un usuario con ese email, lanzamos un error.
    if (existCustomer) {
      emailAlreadyRegisteredError();
    }
    console.log('No hay cliente con ese email');

    // Creamos una id para el usuario.
    const id_cliente = crypto.randomUUID();

    // Insertamos el usuario en la base de datos.
    await insertCustomerModel(id_cliente, nombre, email, telefono);
  } catch (error) {
    // Manejar el error aquí.
    console.error('Error al insertar cliente:', error);
    throw error;
  }
};
