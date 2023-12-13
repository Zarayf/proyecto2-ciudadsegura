export const userAlreadyRegisteredError = () => {
  throw {
    httpStatus: 409, // Conflict
    code: "USER_ALREADY_REGISTERED",
    message: "El nombre de usuario ya está registrado",
  };
};

export const emailAlreadyRegisteredError = () => {
  throw {
    httpStatus: 409, // Conflict
    code: "EMAIL_ALREADY_REGISTERED",
    message: "El email ya está registrado",
  };
};

export const invalidCredentialsError = () => {
  throw {
    httpStatus: 401, // Unauthorized
    code: "INVALID_CREDENTIALS",
    message: "Credenciales inválidas",
  };
};
