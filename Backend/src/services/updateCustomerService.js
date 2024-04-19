import { selectCustomerByEmailModel } from '../models/customer/selectCustomerByEmailModel.js';
import { selectCustomerByIdModel } from '../models/customer/selectCustomerByIdModel.js';
import { selectCustomerByUsernameModel } from '../models/customer/selectCustomerByUsernameModel.js';
import { updateCustomerModel } from '../models/customer/updateCustomerModel.js';
import {
  emailAlreadyRegisteredError,
  usernameAlreadyRegisteredError,
} from './errorService.js';

export const updateCustomerService = async (customerId, body) => {
  const { name, email, phone } = body;

  // Comprobar si el nombre ya existe.
  let existCustomer = await selectCustomerByUsernameModel(name);
  console.log(existCustomer);
  // Si existe, comprobar si es el mismo cliente.
  if (existCustomer && existCustomer.id !== customerId) {
    usernameAlreadyRegisteredError();
  }
  console.log('No hay cliente con ese nombre');

  // Comprobar si el email ya existe.
  existCustomer = await selectCustomerByEmailModel(email);
  // Si existe, comprobar si es el mismo cliente.
  if (existCustomer && existCustomer.id !== customerId) {
    emailAlreadyRegisteredError();
  }

  // Actualizar el cliente en la base de datos.
  await updateCustomerModel(customerId, name, email, phone);

  // Obtener el cliente actualizado.
  const customer = await selectCustomerByIdModel(customerId);

  // Devolver el cliente actualizado.
  return customer;
};
