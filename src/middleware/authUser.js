// Importamos las dependencias.
import jwt from 'jsonwebtoken';
import getPool from '../db/getPool.js';
// Importamos los errores.
import {
  notAuthenticatedError,
  invalidCredentialsError,
} from '../services/errorService.js';

import { SECRET } from '../../env.js';

// Función controladora intermedia que desencripta el token y crea la propiedad "req.user".
// Si no hay token lanza un error.
const authUser = async (req, res, next) => {
  try {
    //   obetenemos la autorizacion que pegamos en el header
    const { authorization } = req.headers;

    if (!authorization) {
      notAuthenticatedError();
    }

    //const token = authorization.split(' ')[1]; lo comentamos porque de esta manera no vuelca datos en el front (LIDIA)
    const token = authorization;

    // Variable que almacenará la info del token.
    let tokenInfo;

    try {
      tokenInfo = jwt.verify(token, SECRET);
    } catch (err) {

      invalidCredentialsError();
    }

    // !por revisar
    // if (tokenInfo.iat < req.user.update_date) {
    //   notAuthenticatedError();
    // }

    // creamos una propiedad que sera igual que la info del token
    req.user = tokenInfo;

    // Pasamos el control a la siguiente función controladora.
    next();
  } catch (err) {
    next(err);
  }
};

export { authUser };
