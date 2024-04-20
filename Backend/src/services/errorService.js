export const notFoundError = (resource) => {
  throw {
    statusCode: 404, // Not Found
    code: 'RESOURCE_NOT_FOUND',
    message: `El recurso '${resource}' no existe`,
  };
};
export const usernameAlreadyRegisteredError = () => {
  throw {
    statusCode: 409, // Conflict
    code: 'CUSTOMER_ALREADY_REGISTERED',
    message: 'El nombre del cliente ya está registrado',
  };
};
export const emailAlreadyRegisteredError = () => {
  throw {
    statusCode: 409, // Conflict
    code: 'EMAIL_ALREADY_REGISTERED',
    message: 'El email ya está uso',
  };
};

export const invalidCredentials = (message) => {
  throw {
    statusCode: 401,
    code: 'INVALID_CREDENTIALS',
    message: message || 'Credenciales inválidas',
  };
};

export const userAlreadyActivatedError = () => {
  throw {
    statusCode: 409, // Conflict
    code: 'USER_ALREADY_ACTIVATED',
    message: 'El usuario ya está activado',
  };
};
