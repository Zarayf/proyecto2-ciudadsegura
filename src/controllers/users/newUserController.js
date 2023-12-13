import insertUserModel from "../../models/users/insertUserModel.js";

// Importamos los servicios.
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

// Importamos el esquema.
import newUserSchema from "../../schemas/users/newUserSchema.js";

// Función controladora final que crea un nuevo usuario.
const newUserController = async (req, res, next) => {
  try {
    // Obtenemos los datos necesarios del body.
    const { nombre_usuario, contrasenya, correo_electronico } = req.body;

    // Validamos el body con Joi.
    await validateSchemaUtil(newUserSchema, req.body);

    // Insertamos el usuario.
    await insertUserModel(nombre_usuario, contrasenya, correo_electronico);

    res.send({
      status: "ok",
      message: "Usuario creado",
    });
  } catch (err) {
    next(err);
  }
};

export default newUserController;
