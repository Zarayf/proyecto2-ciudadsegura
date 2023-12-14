import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//importamos los modelos
import selectUserByEmailModel from "../../models/users/selectUserByEmailModel.js";

// Importamos los servicios.
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Importamos el esquema.
import loginUserSchema from "../../schemas/users/loginUserSchema.js";
// importamos el error de credenciales invalidas
import { invalidCredentialsError } from "../../services/errorService.js";
// importamos el SECRET
import { SECRET } from "../../../env.js";

const loginUserController = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    // validamos el body con el joi

    await validateSchemaUtil(loginUserSchema, req.body);

    // Seleccionamos los datos del usuario que necesitamos utilizando el email.
    const user = await selectUserByEmailModel(email);

    // Variable que almacenará un valor booleano indicando si la contraseña es correcto o no.
    let validPass;

    // Si existe un usuario comprobamos si la contraseña coincide.
    if (user) {
      // Comprobamos si la contraseña es válida.
      validPass = await bcrypt.compare(password, user.password);
    }
    // Si las contraseña no coincide o no existe un usuario con el email proporcionado
    // lanzamos un error.
    if (!user || !validPass) {
      invalidCredentialsError();
    }
    // almacenamos la info en el token
    const tokenInfo = {
      user: user.user_name,
    };

    // firmamos el token.
    const token = jwt.sign(tokenInfo, SECRET, {
      expiresIn: "8d",
    });
    res.send({
      status: "ok",
      data: {
        token, // encriptado con JWT
        user: user.user_name,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default loginUserController;
