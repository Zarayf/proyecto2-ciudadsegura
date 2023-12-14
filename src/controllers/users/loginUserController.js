import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//importamos los modelos
import selectUserByEmailModel from "../../models/users/selectUserByEmailModel.js";

// Importamos los servicios.
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Importamos el esquema.
//import loginUserSchema from '../../schemas/users/loginUserSchema.js';

const loginUserController = async (req, res, next) => {
  try {
    const { email, pass } = req.body;

    // Seleccionamos los datos del usuario que necesitamos utilizando el email.
    const user = await selectUserByEmailModel(email, pass);

    // Variable que almacenará un valor booleano indicando si la contraseña es correcto o no.
    let validPass;
    /*
    // Si existe un usuario comprobamos si la contraseña coincide.
    if (user) {
      // Comprobamos si la contraseña es válida.
      await bcrypt.compare(pass, user.pass);
      console.log(validPass);
    }
*/
    if (user && pass === user.pass) {
      console.log("bien");
    }

    // Si las contraseña no coincide o no existe un usuario con el email proporcionado
    // lanzamos un error.
    // ! = operador de negación
    if (!user || pass !== user.pass) {
      //invalidCredentialsError();
      console.log("ERROR");
    }

    res.send({
      status: "ok",
      data: {
        //token,  encriptado con JWT
        id: user.id,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default loginUserController;
