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

export const passwordAlreadyRegisteredError = () => {
  throw {
    statusCode: 409, // Conflict
    code: 'PASSWORD_ALREADY_REGISTERED',
    message: 'La contraseña ya está registrado',
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

export const serverError = (message = 'Error del servidor') => {
  return {
    statusCode: 500, // Internal Server Error
    code: 'SERVER_ERROR',
    message: 'Error en el servidor'
  };
};

