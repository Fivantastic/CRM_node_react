export const usernameAlreadyRegisteredError = () => {
  throw {
    httpStatus: 409, // Conflict
    code: 'CUSTOMER_ALREADY_REGISTERED',
    message: 'El nombre del cliente ya está registrado',
  };
};
export const emailAlreadyRegisteredError = () => {
  throw {
    httpStatus: 409, // Conflict
    code: 'EMAIL_ALREADY_REGISTERED',
    message: 'El email ya está uso',
  };
};
