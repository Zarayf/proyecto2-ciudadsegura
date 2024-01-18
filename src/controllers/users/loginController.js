// Importamos las dependencias.
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Importamos los modelos.
import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';

// Importamos los errores.
import {
  invalidCredentialsError,
  invalidUserError,
} from '../../services/errorService.js';

// Función controladora final que logea a un usuario retornando un token.
const loginController = async (req, res, next) => {
  try {
    const { email, pass } = req.body;
    if (!email || !pass) {
      throw invalidCredentialsError;
    }

    // Recojo los datos de la base de datos del usuario con ese email
    const user = await selectUserByEmailModel(email);
    if (!user) {
      throw invalidUserError('El usuario es incorrecto.', 401);
    }

    // Compruebo que las contraseñas coinciden
    const validPassword = await bcrypt.compare(pass, user.pass);

    if (!validPassword) {
      throw invalidCredentialsError('La contraseña no coincide.', 401);
    }

    // Creo el payload del token
    const payload = { id: user.id_user };

    // Firmo el token
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: '15d',
    });

    // Envío el token
    res.send({
      status: `ok`,
      data: token,
    });
  } catch (error) {
    next(error);
  }
};
export default loginController;
