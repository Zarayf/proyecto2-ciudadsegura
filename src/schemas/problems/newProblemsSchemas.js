// Importamos joi.
import joi from "joi";

// Importamos los mensajes de error personalizados.
import joiErrorMessages from "../joiErrorMessages.js";

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const newProblemsSchema = joi.object({
  id_district: joi.number().required().messages(joiErrorMessages),
  title: joi.string().min(5).max(30).required().messages(joiErrorMessages),
  description: joi
    .string()
    .min(10)
    .max(500)
    .required()
    .messages(joiErrorMessages),
  photo: joi.string().min(3).max(100).messages(joiErrorMessages),
  place_detail: joi
    .string()
    .min(5)
    .max(1000)
    .required()
    .messages(joiErrorMessages),
});

export default newProblemsSchema;
