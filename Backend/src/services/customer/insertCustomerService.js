import { insertCustomerModel } from '../../models/customer/insertCustomerModel.js';
import { insertAddressCustomerModel } from '../../models/customer/insertAddressCustomerModel.js';
import { selectCustomerByEmailModel } from '../../models/customer/selectCustomerByEmailModel.js';
import { emailAlreadyRegisteredError } from '../error/errorService.js';
import { getMaxReference3Digits } from '../../models/getMaxReference.js';
import { generateReference3DigitsFromRef } from '../../utils/generateReference3Digits.js';
import crypto from 'crypto';

export const insertCustomerService = async (body) => {
  try {
    // Obtener los datos del body.
    const { 
      name, 
      last_name,
      email, 
      phone, 
      company_name, 
      NIF, 
      address, 
      number, 
      floor, 
      letter_number, 
      city, 
      zip_code, 
      country
      } = body;

    // Buscamos en la base de datos algún usuario con ese email.
    const existCustomer = await selectCustomerByEmailModel(email);

    // Si existe un usuario con ese email, lanzamos un error.
    if (existCustomer) {
      emailAlreadyRegisteredError();
    }

    // Obtenemos la referencia máxima de la tabla Customers
    const maxRef = await getMaxReference3Digits('Customers', 'ref_CT');

    // Generamos la nueva referencia de Customers
    const ref = generateReference3DigitsFromRef('CT', 'C', maxRef);

    // Creamos una id para el usuario.
    const id_customer = crypto.randomUUID();

    // Creamos una id para la dirección
    const id_address = crypto.randomUUID();

    // Insertamos la dirección en la base de datos.
    await insertAddressCustomerModel(
      id_address,
      address,  
      number,
      floor,
      letter_number,
      city,
      zip_code,
      country
    );

    // Insertamos el usuario en la base de datos
    const response = await insertCustomerModel(
      id_customer,
      ref,
      name,
      last_name,
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