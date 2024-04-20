import bcrypt from "bcrypt";

import { insertUserModel } from '../models/user/insertUserModel.js';
import { selectUserByEmailModel } from '../models/user/selectUserByEmailModel.js';
import { emailAlreadyRegisteredError } from './errorService.js';

export const insertUserService = async (name, surname, email, password, role) => {
  try {
    // Buscamos en la base de datos algún usuario con ese email.
    const existUser = await selectUserByEmailModel(email);

    // Si existe un usuario con ese email, lanzamos un error.
    if (existUser) {
      emailAlreadyRegisteredError();
    }
    console.log('Email libre');

    // Creamos una id y un código de activación para el usuario.
    const id_user = crypto.randomUUID();
    const registration_code = crypto.randomUUID();
    const random_password = generarPasswordAleatorio(10);

    const hashed_password = await bcrypt.hash(random_password, 12)

    // Insertamos el usuario en la base de datos.
    await insertUserModel(
        id_user, 
        name, 
        surname, 
        email, 
        hashed_password, 
        role, 
        registration_code );
  } catch (error) {
    // Manejar el error aquí.
    console.error('Error al insertar usuario:', error);
    throw error;
  }
};

function generarPasswordAleatorio(longitud) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_';
  let password = '';
  for (let i = 0; i < longitud; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      password += caracteres.charAt(indice);
  }
  return password;
}