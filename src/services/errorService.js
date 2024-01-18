export const userAlreadyRegisteredError = () => {
  throw {
    httpStatus: 409, // Conflict
    code: 'USER_ALREADY_REGISTERED',
    message: 'El nombre de usuario ya está registrado',
  };
};

export const emailAlreadyRegisteredError = () => {
  throw {
    httpStatus: 409,
    code: 'EMAIL_ALREADY_REGISTERED',
    message: 'El email ya está registrado',
  };
};

export const invalidCredentialsError = () => {
  throw {
    httpStatus: 401,
    code: 'INVALID_CREDENTIALS',
    message: 'Credenciales inválidas',
  };
};
export const invalidUserError = () => {
  throw {
    httpStatus: 401,
    code: 'INVALID_CREDENTIALS',
    message: 'Usuario incorrecto.',
  };
};
export const notAuthenticatedError = () => {
  throw {
    httpStatus: 401,
    code: 'NOT_AUTHENTICATED',
    message: `Debes enviar un token en el header 'Authorization'`,
  };
};
export const sendEmailError = () => {
  throw {
    httpStatus: 500, // Internal server error
    code: 'SEND_EMAIL_FAILED',
    message: 'Error al enviar email',
  };
};
export const notFoundError = (resource) => {
  throw {
    httpStatus: 404, // Not Found
    code: 'RESOURCE_NOT_FOUND',
    message: `El recurso requerido '${resource}' no existe`,
  };
};
export const recoveryCodeError = () => {
  throw new Error({
    httpStatus: 401, // Unauthorized
    code: 'INVALID_RECOVERY_CODE',
    message: 'Código de recuperación incorrecto',
  });
};
