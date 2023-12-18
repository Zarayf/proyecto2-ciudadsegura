// Importamos los modelos.
import insertProblemsModel from "../../models/problems/insertProblemsModel.js";
// import fs from 'fs/promises';

import path from "path";
import sharp from "sharp";
import { nanoid } from "nanoid";
// Importamos los servicios.
import validateSchemaUtil from "../../utils/validateSchemaUtil.js";

//  ! QUEDA EL ESQUEMA -hecho :)
//Y VALIDAR LA FUNCION CONTROLADORA Y CAMBIAR PASSWORD POR PASS
// Importamos el esquema.
import newProblemsSchemas from "../../schemas/problems/newProblemsSchemas.js";
// ! para crear el directorio lo usamos aqui por que no nos funciona la importacion
// ! por ahora lo dejamos asi :(
const createdpath = async (path) => {
  try {
    await fs.access(path);
  } catch {
    await fs.mkdir(path);
  }
};
// import createdpath from "./service.js";

// Función controladora final que agrega una nueva entrada.
const newProblemsController = async (req, res, next) => {
  try {
    const { id_district, title, description, photo, place_detail } = req.body;

    // Validamos el body con Joi. Fusionamos en un solo objeto las propiedades de body y de files.
    await validateSchemaUtil(newProblemsSchemas, Object.assign(req.body));
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    photo;

    if (req.files && req.files.image) {
      // Creo el path del directorio uploads
      const uploadsDir = path.join(__dirname, "../uploads");

      // Creo el directorio si no existe
      await createdpath(uploadsDir);

      // Procesar la imagen
      const image = sharp(req.files.image.data);
      image.resize(1000);

      // Guardo la imagen con un nombre aleatorio en el directorio uploads
      photo = `${nanoid(24)}.jpg`;

      await image.toFile(path.join(uploadsDir, photo));
    }

    // Insertamos la entrada y obtenemos el id que se le ha asignado.
    const problem = await insertProblemsModel(
      id_district,
      title,
      description,
      photo,
      place_detail
      //req.user.id lo comento porque no usamos el id del usuario
    );

    console.log(problem);

    res.send({
      status: "ok",
      data: {
        entry: {
          id_district,
          title,
          description,
          photo,
          place_detail,
          //userId: req.user.id, lo comento porque no usamos el id del usuario
          createdAt: new Date(),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export default newProblemsController;
