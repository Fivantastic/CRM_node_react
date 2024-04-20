import bcrypt from "bcrypt";

import { insertUserModel } from '../models/user/insertUserModel.js';
import { selectUserByEmailModel } from '../models/user/selectUserByEmailModel.js';
import { emailAlreadyRegisteredError } from './errorService.js';
import { generateRandomPassword } from "../utils/generateRandomPassword.js";
// import { sendWelcomeEmail } from "./emailService.js";

export const insertUserService = async (name, surname, email, role, registration_code) => {
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
    const random_password = generateRandomPassword(10);
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

    console.log('Usuario insertado');    

    console.log(random_password);

    // ! Desactivado por motivos de prueba la funcion de enviar correo de bienvenida
    // Enviar correo electrónico de bienvenida
    // await sendWelcomeEmail(name, surname, random_password, email, registration_code);
    
    // console.log('Correo enviado');
  } catch (error) {
    // Manejar el error aquí.
    console.error('Error al insertar usuario:', error);
    throw error;
  }
};