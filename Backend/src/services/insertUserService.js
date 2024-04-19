import { insertUserModel } from '../models/user/insertUserModel.js';
import { selectUserByEmailModel } from '../models/user/selectUserByEmailModel.js';
import {
  emailAlreadyRegisteredError,
} from './errorService.js';

export const insertUserService = async (name, surname, email, password, role) => {
  try {
    // Buscamos en la base de datos algún usuario con ese email.
    existUser = await selectUserByEmailModel(email);

    // Si existe un usuario con ese email, lanzamos un error.
    if (existCustomer) {
      emailAlreadyRegisteredError();
    }
    console.log('Email válido');

    // Creamos una id y un código de activación para el usuario.
    const id_user = crypto.randomUUID();
    const registration_code = crypto.randomUUID();

    // Insertamos el usuario en la base de datos.
    await insertUserModel(
        id_user, 
        name, 
        surname, 
        email, 
        password, 
        role, 
        registration_code );
  } catch (error) {
    // Manejar el error aquí.
    console.error('Error al insertar usuario:', error);
    throw error;
  }
};
