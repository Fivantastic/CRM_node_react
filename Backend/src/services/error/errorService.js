export const notFoundError = (resource) => {
  throw {
    statusCode: 404, // Not Found
    code: 'RESOURCE_NOT_FOUND',
    message: `El '${resource}' no existe`,
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

export const shipmentAlreadyCompletedError = () => {
  throw {
    statusCode: 409, // Conflict
    code: 'SHIPMENT_ALREADY_COMPLETED',
    message: 'El envio ya esta completado',
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
    message: 'Error en el servidor',
  };
};
export const limitedStock = (resource) => {
  throw {
    statusCode: 409,
    code: 'LIMITED_STOCK',
    message: `La cantidad '${resource}' se exede del stock`,
  };
};

export const saveFileError = () => {
  throw {
    httpStatus: 500, // Internal Server Error
    code: 'FILE_SAVE_FAILED',
    message: 'Error al guardar el archivo en el disco',
  };
};

export const unauthorizedError = (resource) => {
  throw {
    statusCode: 401,
    code: 'UNAUTHORIZED_ACTION',
    message: `La acción '${resource}' debe ser realizada por su propietario`,
  };
};

export const AccountInactiveError = () => {
  throw {
    statusCode: 401,
    code: 'ACCOUNT_INACTIVE_CRM_ERROR',
    message: 'Cuenta inactiva'
  };
};

export const invalidPasswordError = () => {
  throw {
    statusCode: 401,
    code: 'INVALID_PASSWORD_CRM_ERROR',
    message: 'Contraseña inválida'
  };
};

// Error que dice que tiene un modulo asignado
export const moduleAssignedError = () => {
  throw {
    statusCode: 401,
    code: 'MODULE_ASSIGNED_CRM_ERROR',
    message: 'Tiene un modulo asignado, no puede eliminarlo'
  };
}
